import styles from '@/component/form/paymentMethodPanel.module.css';
import {
    useBearChecking,
    useBearSuccess,
    useBearLoading,
    useBearPaymentPanel,
    useBearDataPayment,
    useBearPayment,
    useBearStore,
    useBearClose,
    useBearPaymentStatus
} from '@/zustand/zustand';
import { HandlePayment } from '@/service/HandlePayment';
import { useFormik } from 'formik';
import Link from 'next/link';
import Title from './title';
import { IoIosArrowBack } from "react-icons/io";
import ViewGenerate from './viewGenerate';
import { GetRandomNumber } from '@/utils/getRandomNumber';
import { HandleCekPayment } from '@/service/HandleCekPayment';
import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import NotifikasiSuccess from './notifikasiSuccess';
import Image from 'next/image';
import { Rupiah } from '@/utils/rupiah';

export default function PaymentMethodPanel({ data, hargaFinal }) {
    // Zustand states
    const setShowPaymentPanel = useBearPaymentPanel((state) => state.setShowPaymentPanel);
    const setIsSuccess = useBearSuccess((state) => state.setIsSuccess);
    const isSuccess = useBearSuccess((state) => state.isSuccess);
    const setIsPayment = useBearPayment((state) => state.setIsPayment);
    const setDataPayment = useBearDataPayment((state) => state.setDataPayment);
    const isPayment = useBearPayment((state) => state.isPayment);
    const setPaymentStatus = useBearPaymentStatus((state) => state.setPaymentStatus);
    const loading = useBearLoading((state) => state.loading);
    const setLoading = useBearLoading((state) => state.setLoading);
    const setChecking = useBearChecking((state) => state.setChecking);
    const setBlack = useBearStore((state) => state.setBlack);
    const setIsTrue = useBearClose((state) => state.setIsTrue);

    const [merchantOrderId] = useState(() => GetRandomNumber());
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const savedForm = localStorage.getItem("formData");
        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
    }, []);
    // Daftar metode pembayaran → clean & mudah di-maintain
    const paymentMethods = [
        { value: "qris", label: "QRIS", img: "https://www.invesdigi.com/qris.svg", kodeBank: "SP" },
        { value: "bca", label: "BCA (Transfer)", img: "https://images.duitku.com/hotlink-ok/BC.PNG", kodeBank: "BC" },
        { value: "mandiri", label: "Mandiri (Virtual Account)", img: "https://images.duitku.com/hotlink-ok/M2.PNG", kodeBank: "M2" },
        { value: "bni", label: "BNI (Virtual Account)", img: "https://images.duitku.com/hotlink-ok/I1.PNG", kodeBank: "I1" },
        { value: "bri", label: "BRI (Virtual Account)", img: "https://images.duitku.com/hotlink-ok/BR.PNG", kodeBank: "BR" },
        { value: "ft", label: "FT (Alfamart / Pos)", img: "https://images.duitku.com/hotlink-ok/FT.PNG", kodeBank: "FT" },
    ];

    const handleCloseViewGenerate = () => {
        setIsPayment(false);
        setIsSuccess(false);
        setLoading(false);
    };

    const handleClosePaymentSuccess = () => {
        setIsTrue(false);
        setIsPayment(false);
        setLoading(false);
        setShowPaymentPanel(false);
        setBlack(false);
    };

    const handleCheckStatus = async () => {
        setChecking(true);
        try {
            const res = await HandleCekPayment({ merchantOrderId });

            if (!res?.data?.merchantOrderId) {
                alert("Transaksi belum ditemukan!");
                return;
            }
            if (res?.data?.statusCode === "00") {
                setIsSuccess(true);
                setLoading(false);
            } else if (res?.data?.statusCode === "01") {
                alert(`Transaksi belum ditemukan!, ${res?.data?.statusMessage}`);
                setPaymentStatus('Transaksi belum ditemukan!');
            } else {
                setPaymentStatus("Gagal mendapatkan status transaksi");
            }
        } catch (error) {
            console.log(error);
            setPaymentStatus("Terjadi kesalahan, coba lagi.");
        } finally {
            setChecking(false);
        }
    };

    // Formik untuk validasi & submit
    const validate = (values) => {
        const errors = {};
        if (!values.paymentMethod) errors.paymentMethod = 'Silakan pilih metode pembayaran';
        return errors;
    };

    const formik = useFormik({
        initialValues: { paymentMethod: '' },
        validate,
        onSubmit: async (values) => {
            if (values.paymentMethod === "bca") {
                setIsPayment(true);
                return;
            }

            setLoading(true);
            setBlack(false);
            setIsSuccess(false);
            setPaymentStatus(null);

            try {
                const selectedMethod = paymentMethods.find((m) => m.value === values.paymentMethod);

                if (!selectedMethod) {
                    alert("Metode pembayaran tidak valid!");
                    return;
                }

                const res = await HandlePayment({
                    kodeBank: selectedMethod.kodeBank,
                    linkProduk: data.linkProduk,
                    note: data?.title,
                    merchantOrderId,
                    customerVaName: formData?.nama,
                    email: formData?.email,
                    itemDetails: [{
                        name: data.title,
                        price: hargaFinal,
                        quantity: 1
                    }]
                });

                if (res.data.Message) {
                    alert(res.data.Message);
                    return;
                }
                const { trackEvent } = await import('@/utils/facebookPixel');
                trackEvent('InitiateCheckout', {
                    content_ids: [merchantOrderId],
                    content_name: data.title,
                    value: hargaFinal + ".00",
                    currency: "IDR",
                    num_items: 1,
                    content_type: 'product',
                    contents:
                        [{ "id": merchantOrderId, "quantity": 1, "delivery_category": "produk", "item_price": hargaFinal + ".00" }]
                });
                // trackEvent('order', { order: Rupiah(hargaFinal) });

                setDataPayment(res.data);
                setIsPayment(true);
                setBlack(true);
            } catch (e) {
                console.log(e);
                alert("Gagal memproses pembayaran, silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        },
    });

    const isVA = ["mandiri", "bni", "bri", "ft"].includes(formik.values.paymentMethod);

    return (
        isPayment ? (
            isSuccess ? (
                <>
                    <Title
                        handleClose={handleClosePaymentSuccess}
                        icon={<IoClose size={24} />}
                        title='PAYMENT STATUS'
                    />
                    <NotifikasiSuccess
                        formik={formik}
                        handleClosePayment={handleClosePaymentSuccess}
                        hargaFinal={hargaFinal}
                        merchantOrderId={merchantOrderId}
                        title={data.title}
                    />
                </>
            ) : (
                <>
                    <Title
                        handleClose={handleCloseViewGenerate}
                        icon={<IoIosArrowBack size={24} />}
                        title='Pembayaran'
                    />
                    <ViewGenerate
                        data={data}
                        formik={formik}
                        isVA={isVA}
                        hargaFinal={hargaFinal}
                        handleCheckStatus={handleCheckStatus}
                    />
                </>
            )
        ) : (
            <>
                <Title
                    handleClose={() => setShowPaymentPanel(false)}
                    icon={<IoIosArrowBack size={24} />}
                    title='Metode Pembayaran'
                />

                <div className={styles.paymentMethodPanel}>
                    {/* RADIO GROUP */}
                    <div className={styles.radioGroupFull}>
                        {paymentMethods.map(({ value, label, img }) => (
                            <label
                                key={value}
                                className={`${styles.radioLabelFull} ${formik.values.paymentMethod === value ? styles.selected : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={value}
                                    checked={formik.values.paymentMethod === value}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldTouched("paymentMethod", true);
                                    }}
                                    disabled={loading}
                                />
                                <Image
                                    src={img}
                                    width={70}
                                    height={50}
                                    alt={label}
                                    className={styles.paymentLogo}
                                />
                                <span className={styles.paymentName}>{label}</span>
                            </label>
                        ))}
                    </div>

                    {/* ERROR MESSAGE */}
                    {formik.touched.paymentMethod && formik.errors.paymentMethod && (
                        <div className={styles.errorMsg}>{formik.errors.paymentMethod}</div>
                    )}

                    <label className={styles.checkboxLabel}>
                        <div className={styles.cek}>
                            Dengan melakukan pembelian, Anda menyetujui{" "}
                            <Link href={'/terms'} className={styles.term} target='_blank'>
                                Syarat dan Ketentuan
                            </Link>
                        </div>
                    </label>

                    <button
                        className={styles.confirmBtn}
                        onClick={formik.handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Tungguu..." : (
                            <>
                                <div>BAYAR SEKARANG</div>
                                <div>IDR {hargaFinal}</div>
                            </>
                        )}
                    </button>
                </div>
            </>
        )
    );
}

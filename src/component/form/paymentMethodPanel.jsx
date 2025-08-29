import styles from '@/component/form/paymentMethodPanel.module.css'
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
import { Rupiah } from '@/utils/rupiah';
import Link from 'next/link';
import Title from './title';
import { IoIosArrowBack } from "react-icons/io";
import ViewGenerate from './viewGenerate';
import { GetRandomNumber } from '@/utils/getRandomNumber';
import { HandleCekPayment } from '@/service/HandleCekPayment';
import { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import NotifikasiSuccess from './notifikasiSuccess';
import { initFacebookPixel } from '@/utils/facebookPixel';

export default function PaymentMethodPanel({ data, hargaFinal }) {
    useEffect(() => { initFacebookPixel() }, []);

    const setShowPaymentPanel = useBearPaymentPanel((state) => state.setShowPaymentPanel)
    const setIsSuccess = useBearSuccess((state) => state.setIsSuccess)
    const isSuccess = useBearSuccess((state) => state.isSuccess)
    const setIsPayment = useBearPayment((state) => state.setIsPayment)
    const setDataPayment = useBearDataPayment((state) => state.setDataPayment)
    const isPayment = useBearPayment((state) => state.isPayment)
    // const handleClosePayment = useBearPayment((state) => state.handleClosePayment)
    const setPaymentStatus = useBearPaymentStatus((state) => state.setPaymentStatus)
    const loading = useBearLoading((state) => state.loading)
    const setLoading = useBearLoading((state) => state.setLoading)
    const setChecking = useBearChecking((state) => state.setChecking)
    const setBlack = useBearStore((state) => state.setBlack)
    const setIsTrue = useBearClose((state) => state.setIsTrue)

    const handleCloseViewGenerate = () => {
        setIsPayment(false)
        setIsSuccess(false)
        setLoading(false)
    }

    const handleClosePaymentSuccess = () => {
        setIsTrue(false)
        setIsPayment(false)
        setLoading(false)
        setShowPaymentPanel(false)
        setBlack(false)
    }
    const [merchantOrderId] = useState(() => GetRandomNumber());


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
                // setPaymentStatus(res?.data?.statusMessage + " - Cek Email kamu😁");
                setLoading(false);
            }
            if (res?.data?.statusCode === "01") {
                // setIsSuccess(true);
                alert(`Transaksi belum ditemukan!, ${res?.data?.statusMessage}`);
                setPaymentStatus('Transaksi belum ditemukan!');
                // setLoading(false);
            }
            else {
                setPaymentStatus("Gagal mendapatkan status transaksi");
            }
        } catch (error) {
            console.log(error);
            setPaymentStatus("Terjadi kesalahan, coba lagi.");
        } finally {
            setChecking(false);
        }
    };

    // Mapping metode → kodeBank
    const getKodeBank = (method) => {
        switch (method) {
            case "qris": return "SP";
            case "mandiri": return "M2";
            case "bni": return "I1";
            case "bri": return "BR";
            case "ft": return "FT";
            case "bca": return "BC";
            default: return "SP";
        }
    };

    const validate = values => {
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
                return
            }
            setLoading(true);
            setBlack(false);
            setIsSuccess(false)
            setPaymentStatus(null)



            // CASE QRIS & BANK LAIN → HandlePayment otomatis
            try {
                const kodeBank = getKodeBank(values.paymentMethod);
                const res = await HandlePayment({
                    kodeBank,
                    linkProduk: data.linkProduk,
                    note: data?.title,
                    merchantOrderId,
                    itemDetails: [{
                        name: data.title,
                        price: hargaFinal,
                        quantity: 1
                    }]
                });

                const { trackEvent } = await import('@/utils/facebookPixel');
                trackEvent('order', { order: Rupiah(hargaFinal) });

                setDataPayment(res.data);
                setIsPayment(true);
                setBlack(true);
                setLoading(false);
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
                    />
                </>
            ) : (
                <>
                    <Title
                        handleClose={() => handleCloseViewGenerate()}
                        icon={<IoIosArrowBack size={24} />}
                        title='Metode Pembayaran'
                    />
                    <ViewGenerate
                        data={data}
                        formik={formik}
                        isVA={isVA}
                        hargaFinal={hargaFinal}
                        handleCheckStatus={() => handleCheckStatus()}
                    />
                </>
            )
        ) : (
            <>
                <Title
                    handleClose={() => setShowPaymentPanel(false)}
                    icon={<IoIosArrowBack size={24} />}
                    title='Metode Pembayaran' />
                <div className={styles.paymentMethodPanel}>
                    {/* RADIO GROUP */}
                    <div className={styles.radioGroupFull}>
                        {["qris", "bca", "mandiri", "bni", "bri", "ft"].map((method) => (
                            <label
                                key={method}
                                className={`${styles.radioLabelFull} ${formik.values.paymentMethod === method ? styles.selected : ""}`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method}
                                    checked={formik.values.paymentMethod === method}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        formik.setFieldTouched("paymentMethod", true);
                                    }}
                                    disabled={loading}
                                />
                                <span>{method.toUpperCase()}</span>
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
                            <Link href={'/terms'} className={styles.term} target='_blank'>Syarat dan Ketentuan</Link>
                        </div>
                    </label>

                    <button
                        className={styles.confirmBtn}
                        onClick={formik.handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Tungguu..." : <>
                            <div>
                                BAYAR SEKARANG
                            </div>
                            <div>
                                IDR {hargaFinal}
                            </div>
                        </>
                        }
                    </button>
                </div>
            </>

        )
    );
}

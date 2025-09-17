'use client'
import styles from '@/component/fromData.module.css'
import {
    useBearStore,
    useBearClose,
    useBearPaymentPanel,
    useBearLoading,
} from '@/zustand/zustand';
import { useFormik } from 'formik';
import { IoClose } from "react-icons/io5";
import PaymentMethodPanel from './form/paymentMethodPanel';
import Title from './form/title';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

export default function FormData({ data }) {

    const setBlack = useBearStore((state) => state.setBlack)
    const setIsTrue = useBearClose((state) => state.setIsTrue)
    const setShowPaymentPanel = useBearPaymentPanel((state) => state.setShowPaymentPanel)
    const showPaymentPanel = useBearPaymentPanel((state) => state.showPaymentPanel)
    const loading = useBearLoading((state) => state.loading)

    const handleClose = () => {
        setIsTrue(false)
        setBlack(false)
        // setShowPaymentPanel(false)
    }

    const hargaFinal = data.price - ((data?.price * data?.diskon) / 100);

    const validate = values => {
        const errors = {};
        if (!values.email) errors.email = 'Wajib diisi';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Alamat email tidak valid';
        if (!values.nama) errors.nama = 'Wajib diisi';
        else if (values.nama.length > 20) errors.nama = 'Must be 20 characters or less';
        return errors;
    };

    const formik = useFormik({
        initialValues: { nama: '', email: '', term: false },
        validate,
        onSubmit: async (values) => {
            trackEvent('AddPaymentInfo', {
                value: hargaFinal + ".00",
                currency: "IDR",
            });
            localStorage.setItem("formData", JSON.stringify(values));
            setBlack(true)
            setShowPaymentPanel(true)
        },
    });

    return (
        <div className={styles.form}>
            {showPaymentPanel ? (
                <>
                    <PaymentMethodPanel
                        data={data}
                        formik={formik}
                        hargaFinal={hargaFinal}
                    />
                </>
            ) : (
                <>
                    <Title
                        handleClose={handleClose}
                        icon={<IoClose size={24} />}
                        title='DATA PEMBELI' />

                    <form onSubmit={formik.handleSubmit}>
                        <label className={styles.textatas}><span>*</span>Alamat Email (pastikan benar)</label>
                        <input name="email" type="email" placeholder='Alamat Email'
                            onChange={formik.handleChange} value={formik.values.email} disabled={loading} />
                        {formik.errors.email && <div className={styles.errorMsg}>{formik.errors.email}</div>}

                        <label className={styles.textatas}><span>*</span>Nama Lengkap</label>
                        <input name="nama" type="text" placeholder='Nama Lengkap'
                            onChange={formik.handleChange} value={formik.values.nama} disabled={loading} />
                        {formik.errors.nama && <div className={styles.errorMsg}>{formik.errors.nama}</div>}


                        {formik.values.paymentMethod !== "bca" && (
                            <>

                                <label className={styles.checkboxLabel}>
                                    <div className={styles.cek}>Produk dikirim otomatis setelah pembayaran</div>
                                </label>
                                <button
                                    type="submit"
                                >
                                    {loading ? 'Loading...' :
                                        <>
                                            <div style={{ padding: '5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <MdOutlineKeyboardDoubleArrowRight size={20} />  &nbsp;    Lanjut Metode Pembayaran
                                            </div>
                                            {/* <div className={styles.idr}>
                                                IDR {hargaFinal} -&nbsp;<div className={styles.beforediskon}>IDR {data.price}</div>
                                            </div> */}
                                        </>
                                    }
                                </button>
                            </>
                        )}
                    </form>
                </>
            )}
        </div>
    )
}

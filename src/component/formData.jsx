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
                        <label className={styles.textatas}><span>*</span>Alamat Email (Pastikan benar)</label>
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
                                            <div>
                                                Pilih Metode Pembayaran
                                            </div>
                                            <div>
                                                IDR {hargaFinal}
                                            </div>
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

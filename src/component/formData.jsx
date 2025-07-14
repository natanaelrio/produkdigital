import styles from '@/component/fromData.module.css'
import { HandlePayment } from '@/service/HandlePayment';
import useSnapDuitku from '@/service/useSnapDuitku';
import { GetRandomNumber } from '@/utils/getRandomNumber';
import { useFormik } from 'formik';
import { useState } from 'react';

export default function FormData({ data }) {
    const { snapEmbedDuitku } = useSnapDuitku()
    const [loading, setLoading] = useState(false)

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.nama) {
            errors.nama = 'Required';
        } else if (values.nama.length > 15) {
            errors.nama = 'Must be 15 characters or less';
        }

        if (!values.nomer) {
            errors.nomer = 'Required';
        } else if (values.nomer.length > 20) {
            errors.nomer = 'Must be 20 characters or less';
        }

        if (!values.qris) {
            errors.qris = 'Wajib centang pembayaran QRIS';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            nama: '',
            email: '',
            nomer: '',
            qris: false,
        },
        validate,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const res = await HandlePayment({
                    // kodeBank: 'NQ',
                    kodeBank: 'BC',
                    note: data?.title,
                    merchantOrderId: GetRandomNumber(),
                    customerVaName: values.nama,
                    phoneNumber: values.nomer.toString(),
                    email: values.email,
                    itemDetails: [{
                        "name": data.title,
                        "price": data.price - ((data?.price * data?.diskon) / 100),
                        "quantity": 1
                    }]
                })

                // snapEmbedDuitku(res.data, process.env.NODE_ENV === 'production')
                snapEmbedDuitku(res.data, false)
                setLoading(false)
            } catch (e) {
                console.log(e);
                setLoading(false)
            }

        },
    });

    return (
        <>
            <div className={styles.form}>
                <div className={styles.judul}>
                    BUYER INFO
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Your Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && <div className={styles.er}>{formik.errors.email}</div>}

                    <label htmlFor="nama">Your Name</label>
                    <input
                        id="nama"
                        name="nama"
                        type="text"
                        placeholder='Your Name'
                        onChange={formik.handleChange}
                        value={formik.values.nama}
                    />
                    {formik.errors.nama && <div className={styles.er}>{formik.errors.nama}</div>}

                    <label htmlFor="nomer">Phone Number</label>
                    <input
                        style={{ width: '70%' }}
                        id="nomer"
                        name="nomer"
                        type="number"
                        placeholder='08xxxxxxx'
                        onChange={formik.handleChange}
                        value={formik.values.nomer}
                    />
                    {formik.errors.nomer && <div className={styles.er}>{formik.errors.nomer}</div>}

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="qris"
                            checked={formik.values.qris}
                            onChange={formik.handleChange}
                        /> Bayar dengan QRIS
                    </label>
                    {formik.errors.qris && <div className={styles.er}>{formik.errors.qris}</div>}
                    <button type="submit">{loading ? 'Loading...' : `BUY NOW - IDR ${data.price - ((data?.price * data?.diskon) / 100)} `}</button>
                </form>
            </div>
        </>
    )
}

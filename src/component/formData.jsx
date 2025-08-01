'use client'
import styles from '@/component/fromData.module.css'
import { HandlePayment } from '@/service/HandlePayment';
import useSnapDuitku from '@/service/useSnapDuitku';
import { initFacebookPixel } from '@/utils/facebookPixel';
import { GetRandomNumber } from '@/utils/getRandomNumber';
import { Rupiah } from '@/utils/rupiah';
import { useBearStore } from '@/zustand/zustand';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { IoIosAlert } from "react-icons/io";

export default function FormData({ data }) {
    const { snapEmbedDuitku } = useSnapDuitku()
    const [loading, setLoading] = useState(false)
    const setBlack = useBearStore((state) => state.setBlack)
    const black = useBearStore((state) => state.black)

    useEffect(() => {
        initFacebookPixel()
    }, []);

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.nama) {
            errors.nama = 'Required';
        } else if (values.nama.length > 20) {
            errors.nama = 'Must be 20 characters or less';
        }

        if (!values.qris) {
            errors.qris = 'It is mandatory to check QRIS payments';
        }
        if (!values.term) {
            errors.term = 'It is mandatory to check Term of Use';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            nama: '',
            email: '',
            nomer: '',
            qris: false,
            term: false,
        },
        validate,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                setBlack(true)
                const res = await HandlePayment({
                    kodeBank: 'SP',
                    // kodeBank: 'BC',
                    linkProduk: data.linkProduk,
                    note: data?.title,
                    merchantOrderId: GetRandomNumber(),
                    customerVaName: values.nama,
                    // phoneNumber: values.nomer.toString(),
                    email: values.email,
                    itemDetails: [{
                        "name": data.title,
                        "price": data.price - ((data?.price * data?.diskon) / 100),
                        "quantity": 1
                    }]
                })

                const { trackEvent } = await import('@/utils/facebookPixel');
                trackEvent('order', { order: Rupiah(data.price - ((data?.price * data?.diskon) / 100)) });

                // snapEmbedDuitku(res.data, process.env.NODE_ENV === 'production')
                snapEmbedDuitku(res.data, false)
                setLoading(false)
                setBlack(false)
            } catch (e) {
                console.log(e);
                setBlack(false)
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
                    <label htmlFor="email"><span>*</span>Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder='Your Email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        disabled={loading}
                    />
                    {formik.errors.email && <div className={styles.er}>{formik.errors.email}</div>}

                    <label htmlFor="nama"><span>*</span>Your Name</label>
                    <input
                        id="nama"
                        name="nama"
                        type="text"
                        placeholder='Your Name'
                        onChange={formik.handleChange}
                        value={formik.values.nama}
                        disabled={loading}
                    />
                    {formik.errors.nama && <div className={styles.er}>{formik.errors.nama}</div>}
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="qris"
                            checked={formik.values.qris}
                            onChange={formik.handleChange}
                            disabled={loading}
                        />
                        <div className={styles.cek}>
                            Payment <Image src='/qris.svg' alt='qris' width='50' height='20'></Image>
                        </div>
                    </label>
                    {formik.errors.qris && <div className={styles.er}>{formik.errors.qris}</div>}
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="term"
                            checked={formik.values.term}
                            onChange={formik.handleChange}
                            disabled={loading}
                        />
                        <div className={styles.cek}>
                            I agree to the <Link href={'/terms'} target='_blank'>Terms of Use</Link>
                        </div>
                    </label>
                    {formik.errors.term && <div className={styles.er}>{formik.errors.term}</div>}
                    <button disabled={loading} type="submit">{loading ? 'Loading...' : `BUY NOW - IDR ${data.price - ((data?.price * data?.diskon) / 100)} `}</button>
                </form>
                <div className={styles.notifikasi}>
                    <div>
                        <div className={styles.ikon}><IoIosAlert /></div>
                    </div>
                    <div>
                        <div className={styles.text1}>Produk Digital</div>
                        <div className={styles.text2}>Produk Otomatis dikirimkan setelah pembayaran terkonfirmasi</div>
                    </div>
                </div>
            </div>
        </>
    )
}

'use client'
import styles from '@/component/fromData.module.css'
import { HandlePayment } from '@/service/HandlePayment';
import useSnapDuitku from '@/service/useSnapDuitku';
import { initFacebookPixel } from '@/utils/facebookPixel';
import { GetRandomNumber } from '@/utils/getRandomNumber';
import { Rupiah } from '@/utils/rupiah';
import { useBearStore } from '@/zustand/zustand';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from "react-icons/fa6";
import { IoIosAlert } from "react-icons/io";
import { useRouter } from 'nextjs-toploader/app';
import Image from 'next/image';

export default function FormData({ data }) {
    const router = useRouter();
    const { snapEmbedDuitku } = useSnapDuitku()
    const [loading, setLoading] = useState(false)
    const setBlack = useBearStore((state) => state.setBlack)

    const waNumber = "628971041460";
    const hargaFinal = data.price - ((data?.price * data?.diskon) / 100);

    useEffect(() => {
        initFacebookPixel()
    }, []);

    const validate = values => {
        const errors = {};
        if (!values.email) errors.email = 'Required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address';

        if (!values.nama) errors.nama = 'Required';
        else if (values.nama.length > 20) errors.nama = 'Must be 20 characters or less';

        if (!values.paymentMethod) errors.paymentMethod = 'Please select a payment method';

        if (values.paymentMethod !== 'bank' && !values.term) {
            errors.term = 'It is mandatory to check Term of Use';
        }

        return errors;
    };

    const formik = useFormik({
        initialValues: { nama: '', email: '', nomer: '', paymentMethod: '', term: false },
        validate,
        onSubmit: async (values) => {
            setLoading(true)
            setBlack(true)
            if (values.paymentMethod === "bank") {
                const waMessage = `
Halo Invesdigi,

Saya ${formik.values.nama} (Email: ${formik.values.email}) sudah mentransfer ke:
BANK BCA - 0132248336 - Natanael Rio Wijaya

Detail produk:
- Produk : ${data?.title}
- Harga  : ${Rupiah(hargaFinal)}

Mohon segera diproses. Terima kasih.`;
                const { trackEvent } = await import('@/utils/facebookPixel');
                trackEvent('order', { order: Rupiah(data.price - ((data?.price * data?.diskon) / 100)) });

                router.push(`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`);
                setLoading(false)
                return
            }; // kalau bank, tidak submit ke Duitku

            try {
                const kodeBank = values.paymentMethod === 'qris' ? 'SP' : 'BC';
                const res = await HandlePayment({
                    kodeBank,
                    linkProduk: data.linkProduk,
                    note: data?.title,
                    merchantOrderId: GetRandomNumber(),
                    customerVaName: values.nama,
                    email: values.email,
                    itemDetails: [{
                        name: data.title,
                        price: data.price - ((data?.price * data?.diskon) / 100),
                        quantity: 1
                    }]
                })

                const { trackEvent } = await import('@/utils/facebookPixel');
                trackEvent('order', { order: Rupiah(data.price - ((data?.price * data?.diskon) / 100)) });
                setLoading(false)
                snapEmbedDuitku(res.data, false)
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
                setBlack(false)
            }
        },
    });

    return (
        <div className={styles.form}>
            <div className={styles.judul}>BUYER INFO</div>
            <form onSubmit={formik.handleSubmit}>
                <label className={styles.textatas} htmlFor="email"><span>*</span>Email Address</label>
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

                <label className={styles.textatas} htmlFor="nama"><span>*</span>Your Name</label>
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

                <div className={styles.paymentMethod}>
                    <span>*</span>Payment Method
                    <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="qris"
                                checked={formik.values.paymentMethod === "qris"}
                                onChange={formik.handleChange}
                                disabled={loading}
                            />
                            <span>
                                <Image src={`${process.env.NEXT_PUBLIC_URL}/qris.svg`} width={50} height={20} alt='bca'></Image></span>
                        </label>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank"
                                checked={formik.values.paymentMethod === "bank"}
                                onChange={formik.handleChange}
                                disabled={loading}
                            />
                            <span>
                                <Image src={'https://api-sandbox.duitku.com/pgimages/pg/BC.svg'} width={50} height={20} alt='bca'></Image>
                                Transfer</span>
                        </label>
                    </div>
                    {formik.errors.paymentMethod && <div className={styles.er}>{formik.errors.paymentMethod}</div>}
                </div>
                {formik.values.paymentMethod === "bank" && (
                    <div className={styles.bankInfo}>
                        <p>Pembayaran dapat dilakukan melalui transfer ke rekening berikut:</p>
                        <div className={styles.rekening}>
                            <strong>BANK BCA - 0132248336 - Natanael Rio Wijaya</strong>
                            <br></br>
                            <strong>Jumlah: {Rupiah(hargaFinal)} </strong>
                        </div>
                        {/* <p>Setelah transfer, mohon kirim bukti pembayaran untuk kami proses.</p> */}
                        <button
                            style={{ background: '#25d366' }}
                            className={styles.btnWa}
                            disabled={loading} type="submit">
                            <div className={styles.textbtn}>
                                <FaWhatsapp fontSize={17} />
                            </div>
                            <div className={styles.textbtn}>
                                {loading ? 'Loading...' : `Kirim Bukti via WhatsApp`}
                            </div>
                        </button>
                    </div>
                )}

                {formik.values.paymentMethod !== "bank" && (
                    <>
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

                        <button disabled={loading} type="submit">
                            {loading ? 'Loading...' : `BUY NOW - IDR ${hargaFinal}`}
                        </button>

                        <div className={styles.notifikasi}>
                            <div className={styles.ikon}><IoIosAlert /></div>
                            <div>
                                <div className={styles.text1}>Produk Digital</div>
                                <div className={styles.text2}>Produk Otomatis dikirimkan setelah pembayaran terkonfirmasi</div>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

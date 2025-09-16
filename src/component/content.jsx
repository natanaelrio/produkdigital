'use client'
import styles from '@/component/content.module.css'
import Link from 'next/link'
import { FaWhatsapp } from "react-icons/fa";
import FormData from '@/component/formData';
import Image from 'next/image';
import { Rupiah } from '@/utils/rupiah';
import { useBearClose, useBearStore, useBearPayment, useBearPaymentPanel } from '@/zustand/zustand';
import { useEffect } from 'react';
import { trackPageView } from '@/utils/facebookPixel';

export default function Content({ data, hargaFinal }) {
    const black = useBearStore((state) => state.black)
    const isTrue = useBearClose((state) => state.isTrue)
    const setIsTrue = useBearClose((state) => state.setIsTrue)
    const setIsPayment = useBearPayment((state) => state.setIsPayment)
    const setShowPaymentPanel = useBearPaymentPanel((state) => state.setShowPaymentPanel)

    useEffect(() => { trackPageView(data.title, "buku", hargaFinal) }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.gambar}>
                        <Image src={data.image} alt={data.title} width={500} height={500}></Image>
                    </div>
                    <div className={styles.deskripsi}>
                        <div className={styles.atasjudulharga}>
                            <h1 className={styles.judul}>{data.title}</h1>
                            <div className={styles.harga}>
                                <span>{Rupiah(hargaFinal)}</span>
                                <span>{Rupiah(data?.price)}</span>
                            </div>
                        </div>
                        <div className={styles.des}>
                            <h2>DESCRIPTION</h2>
                            <div dangerouslySetInnerHTML={{ __html: data.deskripsi }} />
                        </div>
                        {/* <button onClick={() => setIsTrue(true)}>AMBIL PROMO</button> */}
                    </div>
                </div>
            </div>
            <div className={styles.belimobilecontainer}>
                <div className={styles.belimobile}>
                    <div className={styles.tombolsharewa}>
                        <Link href={'https://wa.me/628971041460'} color='white' target='_blank'>
                            <FaWhatsapp />
                        </Link>
                    </div>
                    <div className={styles.tombolbuy} onClick={() => { setIsTrue(true) }}>
                        <button>AMBIL PROMO</button>
                    </div>
                </div>
            </div>
            {isTrue &&
                <>
                    <FormData data={data} />
                    <div className={styles.bgblack}></div>
                </>
            }
        </>
    )
}

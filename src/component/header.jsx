'use client'
import React from 'react'
import styles from '@/component/header.module.css'
// import { ImBooks } from "react-icons/im";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageView } from '@/utils/facebookPixel';
import Image from 'next/image';

export default function Header({ slug, title }) {
    const text = `Cek ${title ? title : 'produk ini'}, keren banget!`;
    const url = process.env.NEXT_PUBLIC_URL + '/' + slug;
    const url2 = process.env.NEXT_PUBLIC_URL;
    const message = encodeURIComponent(`${text} ${title ? url : url2}`);
    const pathname = usePathname()
    const back = pathname == "/contact" || pathname == "/terms" || pathname == "/privacy" || pathname == "/about"
    const router = useRouter()

    useEffect(() => {
        trackPageView()
    }, []);

    return (
        <>
            <div className={styles.luarcontainer}>
                <div className={styles.container}>
                    <div className={styles.made}>
                        {back ? <Link href='/'>Home</Link> :
                            <>
                                <div className={styles.by}>
                                    Made by
                                </div>
                                <div className={styles.name}>
                                    <Link href='/about'>R</Link>
                                </div>
                            </>
                        }
                    </div>
                    {/* <div></div> */}
                    <Link href='/' className={styles.ikon}>
                        <Image src={'/logo.png'} width={30} height={30} alt='logoinvesdigi' ></Image>
                    </Link >
                    <Link href={`https://wa.me/?text=${message}`} target="_blank" className={styles.share}>
                        Share <FaWhatsapp size={25} />
                    </Link>
                </div>
            </div >
        </>
    )
}




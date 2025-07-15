'use client'
import React from 'react'
import styles from '@/component/header.module.css'
import { ImBooks } from "react-icons/im";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
export default function Header({ slug, title }) {

    console.log(process.env.NEXT_PUBLIC_URL);
    
    const text = `Cek ${title ? title : 'produk ini'}, keren banget!`;
    const url = process.env.NEXT_PUBLIC_URL + '/' + slug;
    const url2 = process.env.NEXT_PUBLIC_URL;
    const message = encodeURIComponent(`${text} ${title ? url : url2}`);

    return (
        <>
            <div className={styles.luarcontainer}>
                <div className={styles.container}>
                    <div className={styles.made}>
                        <div className={styles.by}>
                            Made by
                        </div>
                        <div className={styles.name}><Link href='/about'>R</Link></div>
                    </div>
                    <Link href='/' className="ikon">
                        <ImBooks size={80} />
                    </Link >
                    <Link href={`https://wa.me/?text=${message}`} target="_blank" className={styles.share}>
                        Share <FaWhatsapp size={25} />
                    </Link>
                </div>
            </div >
        </>
    )
}




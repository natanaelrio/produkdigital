'use client'
import React from 'react'
import styles from '@/component/notifkasi.module.css'
import Image from 'next/image'

export default function Notifikasi() {
    return (
        <div className={styles.container}>
            <div className={styles.gambar}>
                <Image src={'/notif.svg'} alt='notif' width={1000} height={100}>
                </Image>
            </div>
            <div className={styles.text}>
                Investasi Terbaik: Pengetahuan Digital.
            </div>
        </div>
    )
}


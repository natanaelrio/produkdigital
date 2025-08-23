'use client'
import styles from '@/component/Banner.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HalamanUtama() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentWord, setCurrentWord] = useState(0)

    const handleScrollToProducts = (e) => {
        e.preventDefault()
        const element = document.getElementById('produk')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    const keywords = [
        "Inspirasi",
        "Wawasan",
        "Kreativitas",
        "Inovasi",
        "Pengetahuan"
    ]

    useEffect(() => {
        setIsVisible(true)
        const wordInterval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % keywords.length)
        }, 2000)
        return () => clearInterval(wordInterval)
    }, [])

    return (
        <div className={styles.container}>
            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
                <div className={styles.textSection}>
                    <h1 className={styles.title}>
                        Temukan <span className={styles.highlight}>{keywords[currentWord]}</span>
                        <br />dalam Setiap Halaman Digital
                    </h1>
                    <p className={styles.description}>
                        Koleksi buku digital terpilih untuk mengembangkan potensi dan memperluas wawasan Anda
                    </p>
                    <Link href={'#produk'} className={styles.cta} onClick={handleScrollToProducts}>
                        Jelajahi Koleksi
                        <span className={styles.arrow}>→</span>
                    </Link>
                </div>

                <div className={styles.decorativeElements}>
                    <div className={styles.circle}></div>
                    <div className={styles.square}></div>
                    <div className={styles.dots}></div>
                </div>
            </div>
        </div>
    )
}

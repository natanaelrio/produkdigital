'use client'
import styles from '@/component/Banner.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Banner() {
    const [isVisible, setIsVisible] = useState(false)

    const handleScrollToProducts = (e) => {
        e.preventDefault()
        const element = document.getElementById('produk')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // === keywords + animasi huruf per huruf ===
    const keywords = [
        "Inspirasi",
        "Wawasan",
        "Kreativitas",
        "Inovasi",
        "Pengetahuan"
    ]
    const [wordIndex, setWordIndex] = useState(0)     // index kata
    const [visible, setVisible] = useState([]) // index huruf yg muncul
    const letters = keywords[wordIndex].split("")

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        setVisible([]) // reset saat ganti kata

        letters.forEach((_, index) => {
            setTimeout(() => {
                setVisible((prev) => [...prev, index])
            }, index * 120) // delay antar huruf
        })

        // ganti kata setelah selesai + delay
        const timeout = setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % keywords.length)
        }, letters.length * 120 + 1500)

        return () => clearTimeout(timeout)
    }, [wordIndex])

    return (
        <div className={styles.container}>
            <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>

                {/* === bagian textSection diganti dengan animasi === */}
                <div className={styles.textSection}>
                    <h1 className={styles.title}>
                        Temukan{" "}
                        <span className={styles.highlight}>
                            {letters.map((char, i) => (
                                <span
                                    key={i}
                                    className={`${styles.word} ${visible.includes(i) ? styles.show : ""}`}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
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
                {/* ================================================ */}

                <div className={styles.decorativeElements}>
                    <div className={styles.circle}></div>
                    <div className={styles.square}></div>
                    <div className={styles.dots}></div>
                </div>
            </div>
        </div>
    )
}

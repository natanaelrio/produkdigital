'use client'
import { useState } from 'react'
import styles from './faq.module.css'
import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null)

    const faqData = [
        {
            question: "Bagaimana cara mendapatkan produk digital setelah pembayaran?",
            answer: "Untuk pembayaran QRIS, produk akan langsung dikirim otomatis ke email Anda segera setelah pembayaran berhasil. Untuk pembayaran transfer bank, Anda perlu mengirimkan bukti transfer melalui WhatsApp untuk diproses manual oleh tim kami."
        },
        {
            question: "Berapa lama proses pengiriman produk digital?",
            answer: "Menggunakan QRIS: Instant/otomatis setelah pembayaran berhasil. Menggunakan Transfer Bank: 5-15 menit setelah konfirmasi bukti transfer (pada jam operasional)."
        },
        {
            question: "Apakah pembayaran QRIS aman?",
            answer: "Ya, pembayaran QRIS sangat aman karena menggunakan standar pembayaran nasional yang diawasi oleh Bank Indonesia. Anda bisa menggunakan berbagai aplikasi e-wallet atau mobile banking untuk scan kode QRIS."
        },
        {
            question: "Mengapa harus konfirmasi jika transfer bank?",
            answer: "Konfirmasi diperlukan untuk transfer bank karena kami perlu memverifikasi pembayaran Anda secara manual. Hal ini untuk memastikan bahwa pembayaran telah diterima dengan benar sebelum mengirimkan produk digital."
        },
        {
            question: "Bagaimana jika saya tidak menerima produk digital?",
            answer: "Untuk pembayaran QRIS, cek folder spam/junk di email Anda. Jika masih belum menerima, hubungi tim support kami melalui WhatsApp dengan menyertakan bukti pembayaran. Untuk transfer bank, pastikan Anda telah mengirimkan bukti transfer."
        }
    ]

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className={styles.container} id="faq">
            <div className={styles.content}>
                <h2 className={styles.title}>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                    {faqData.map((faq, index) => (
                        <div 
                            key={index} 
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                        >
                            <button 
                                className={styles.questionButton} 
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{faq.question}</span>
                                <div className={styles.icon}>
                                    {activeIndex === index ? <IoRemove /> : <IoAdd />}
                                </div>
                            </button>
                            <div className={styles.answerWrapper}>
                                <div className={styles.answer}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

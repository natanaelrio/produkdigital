"use client"

import styles from '@/component/a/contact.module.css'
import Link from 'next/link'
import { FaWhatsapp, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Contact() {
    return (
        <section className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.heading}>Contact Us</h1>
                <p className={styles.intro}>
                    Jika ada pertanyaan atau kerja sama, silakan hubungi kami melalui:
                </p>

                <div className={styles.contactList}>
                    <Link
                        href="https://instagram.com/invesdigi"
                        target="_blank"
                        className={styles.contactItem}
                    >
                        <FaInstagram className={styles.icon2} />
                        <span>@invesdigi</span>
                    </Link>

                    <Link
                        href="https://wa.me/628971041460"
                        target="_blank"
                        className={styles.contactItem}
                    >
                        <FaWhatsapp className={styles.icon} />
                        <span>+62 897 1041 460</span>
                    </Link>

                    <Link
                        href="mailto:invesdigi.official@gmail.com"
                        target="_blank"
                        className={styles.contactItem}
                    >
                        <FaEnvelope className={styles.icon} />
                        <span>invesdigi.official@gmail.com</span>
                    </Link>


                </div>
            </div>
        </section>
    )
}

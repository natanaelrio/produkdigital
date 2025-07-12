import styles from '@/component/a/about.module.css'
import Link from 'next/link'

export default function Contact() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Contact</h1>
            <p className={styles.intro}>
                Whatsapp:   <Link style={{ textDecoration: 'underline' }} href={'https://wa.me/628971041460'} target='_blank'>+628971041460</Link>
            </p>

        </div>
    )
}

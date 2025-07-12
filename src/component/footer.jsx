import styles from '@/component/footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return (
        <div className={styles.luarcontainer}>
            <div className={styles.container}>
                <div className={styles.text}>
                    <Link href='/privacy'>Privacy & Policy</Link>  /
                    <Link href='/terms'>Terms</Link> /
                    <Link href='/contact'>Contact</Link>
                </div>
                <div className={styles.text2}>
                    Dev by  <span><Link href='/about'>R</Link></span> © 2025
                </div>
            </div>
        </div>
    )
}
import styles from '@/component/a/about.module.css'
import Link from 'next/link'

export default function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Tentang Saya</h1>
            <p className={styles.intro}>
                Halo! 👋 Saya <strong>Rio</strong>, seorang kreator digital yang berfokus pada
                pengembangan <em>produk digital</em> untuk meningkatkan produktivitas dan efisiensi.
            </p>

            <section className={styles.section}>
                <h2>Apa yang Saya Buat?</h2>
                <ul>
                    <li>📱 Aplikasi & Tools berbasis web</li>
                    <li>📚 E-book & panduan praktis</li>
                    <li>🎨 Template desain (Canva, PowerPoint, Notion, dll)</li>
                    <li>🎥 Kursus online & materi pelatihan</li>
                    <li>⚙️ Automasi digital & integrasi sederhana</li>
                </ul>
            </section>

            <section className={styles.section}>
                <h2>Visi Saya</h2>
                <p>
                    Saya percaya bahwa teknologi seharusnya <strong>mempermudah hidup</strong>, bukan mempersulit. Setiap produk
                    yang saya kembangkan lahir dari pemahaman terhadap kebutuhan pengguna nyata.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Mengapa Memilih Produk Saya?</h2>
                <ul>
                    <li>✅ Praktis & mudah digunakan</li>
                    <li>✅ Desain profesional</li>
                    <li>✅ Harga terjangkau</li>
                    <li>✅ Dukungan & pembaruan rutin</li>
                    <li>✅ Dibuat dengan riset dan pengalaman nyata</li>
                </ul>
            </section>

            <section className={styles.section}>
                <p>Jika ingin berkolaborasi, hubungi saya di:</p>
                <p>
                    Whatsapp: +628971041460
                    📧 Email: <Link href="mailto:invesdigi.official@gmail.com">invesdigi.official@gmail.com</Link><br />
                    {/* 📱 Instagram: <a href="https://instagram.com/akun_anda" target="_blank" rel="noopener noreferrer">@akun_anda</a><br /> */}
                    {/* 🌐 Website: <a href="https://www.websiteanda.com" target="_blank" rel="noopener noreferrer">www.websiteanda.com</a> */}
                </p>
                <p className={styles.thankyou}>Terima kasih telah mendukung produk digital! 🇮🇩</p>
            </section>
        </div>
    )
}

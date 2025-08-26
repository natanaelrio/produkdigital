import styles from '@/component/a/privacyandterm.module.css'
import Link from 'next/link';

export default function Privacy() {
    return (
        <div className={styles.privacyPolicy}>
            {/* <Link href={'/'}>Home / </Link> Kebijakan Privasi
            <h1 className={styles.title}>Kebijakan Privasi</h1> */}
            <p>
                Kami menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda melakukan pembelian melalui website kami.
            </p>

            <h2 className={styles.sectionTitle}>1. Informasi yang Kami Kumpulkan</h2>
            <ul>
                <li>Nama lengkap</li>
                <li>Alamat email</li>
                <li>Nomor telepon</li>
                <li>Informasi pembayaran (diproses secara aman oleh penyedia layanan pembayaran kami)</li>
                <li>Riwayat pesanan dan preferensi pembelian</li>
            </ul>

            <h2 className={styles.sectionTitle}>2. Penggunaan Informasi</h2>
            <p>Informasi yang Anda berikan akan digunakan untuk:</p>
            <ul>
                <li>Memproses dan mengirim pesanan Anda</li>
                <li>Memberikan informasi terkait status pesanan</li>
                <li>Mengelola akun dan layanan pelanggan</li>
                <li>Mengirimkan promosi atau informasi lain jika Anda menyetujui</li>
            </ul>

            <h2 className={styles.sectionTitle}>3. Perlindungan Data</h2>
            <p>
                Kami berkomitmen menjaga keamanan data pribadi Anda. Kami menggunakan teknologi dan prosedur terbaik untuk mencegah akses tidak sah, kebocoran, atau penyalahgunaan informasi.
            </p>

            <h2 className={styles.sectionTitle}>4. Pihak Ketiga</h2>
            <p>Kami tidak membagikan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan, kecuali kepada:</p>
            <ul>
                <li>Penyedia layanan pembayaran (payment gateway)</li>
            </ul>

            <h2 className={styles.sectionTitle}>5. Cookie</h2>
            <p>
                Website kami dapat menggunakan cookies untuk meningkatkan pengalaman pengguna, seperti menyimpan preferensi dan membantu proses checkout.
            </p>

            <h2 className={styles.sectionTitle}>6. Persetujuan</h2>
            <p>
                Dengan menggunakan website dan melakukan pembelian, Anda menyetujui pengumpulan dan penggunaan data sesuai dengan Kebijakan Privasi ini.
            </p>

            <h2 className={styles.sectionTitle}>7. Hak Anda</h2>
            <ul>
                <li>Meminta akses ke informasi pribadi Anda</li>
                <li>Memperbaiki data yang tidak akurat</li>
                <li>Menghapus data Anda (dengan batasan tertentu sesuai hukum yang berlaku)</li>
            </ul>

            <h2 className={styles.sectionTitle}>8. Perubahan Kebijakan</h2>
            <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diberitahukan melalui website kami.
            </p>
            <p></p>
            <p></p>
            <p style={{ textDecoration: 'underLine' }}>Terakhir diupdate: 25 Juni 2025</p>
        </div>
    );
}

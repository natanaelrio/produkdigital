import styles from '@/component/a/privacyandterm.module.css'
import Link from 'next/link';

export default function Terms() {
    return (
        <div className={styles.privacyPolicy}>
            <Link href={'/'}>Home / </Link> Syarat dan Ketentuan
            <h1 className={styles.title}>Syarat dan Ketentuan</h1>
            <p>
                Dengan mengakses dan menggunakan website ini, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan yang berlaku.
            </p>

            <h2 className={styles.sectionTitle}>1. Penggunaan Website</h2>
            <p>
                Website ini digunakan untuk melakukan pembelian produk yang tersedia. Segala aktivitas yang melanggar hukum atau merugikan pihak lain dilarang keras.
            </p>

            <h2 className={styles.sectionTitle}>2. Informasi Produk</h2>
            <p>
                Kami berusaha menyajikan informasi produk secara akurat dan terbaru. Namun, kesalahan penulisan atau informasi dapat terjadi dan kami berhak untuk memperbaiki tanpa pemberitahuan sebelumnya.
            </p>

            <h2 className={styles.sectionTitle}>3. Harga dan Pembayaran</h2>
            <p>
                Semua harga yang tertera sudah termasuk pajak (jika berlaku). Pembayaran harus dilakukan sesuai dengan metode yang tersedia. Kami berhak menolak transaksi jika terjadi kecurangan atau pelanggaran.
            </p>

            <h2 className={styles.sectionTitle}>4. Pengiriman</h2>
            <p>
                Pengiriman akan dilakukan setelah pembayaran Anda berhasil dikonfirmasi. Produk digital akan dikirimkan melalui email secara otomatis saat melakukan pembelian.
            </p>
            <p>
                Pastikan Anda mengisi data kontak dengan benar. Keterlambatan atau kegagalan pengiriman akibat kesalahan input bukan tanggung jawab kami.Hubungi Kami jika belum menerima produk setelah pembelian.
            </p>

            <h2 className={styles.sectionTitle}>5. Pengembalian dan Refund</h2>
            <p>
                Permintaan pengembalian barang hanya dapat dilakukan sesuai dengan kebijakan pengembalian yang berlaku. Barang harus dalam kondisi asli dan belum digunakan.
            </p>

            <h2 className={styles.sectionTitle}>6. Batasan Tanggung Jawab</h2>
            <p>
                Kami tidak bertanggung jawab atas kerugian langsung maupun tidak langsung akibat penggunaan website ini atau keterlambatan layanan pihak ketiga (seperti ekspedisi atau payment gateway).
            </p>

            <h2 className={styles.sectionTitle}>7. Perubahan Syarat</h2>
            <p>
                Kami dapat memperbarui Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan. Penggunaan website setelah perubahan dianggap sebagai persetujuan Anda terhadap perubahan tersebut.
            </p>

            <h2 className={styles.sectionTitle}>8. Hukum yang Berlaku</h2>
            <p>
                Syarat dan Ketentuan ini diatur oleh hukum yang berlaku di wilayah operasional kami. Jika terjadi perselisihan, maka akan diselesaikan sesuai dengan ketentuan hukum yang berlaku.
            </p>
            <p></p>
            <p></p>
            <p style={{ textDecoration: 'underLine' }}>Terakhir diupdate: 25 Juni 2025</p>
        </div>
    );
}

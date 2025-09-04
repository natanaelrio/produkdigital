import styles from '@/component/form/notifikasiSuccess.module.css'
import { trackEvent } from '@/utils/facebookPixel';
import { MdEmail } from "react-icons/md";

export default function NotifikasiSuccess({ formik, handleClosePayment, hargaFinal }) {

    useEffect(() => {
        trackEvent('Purchase', {
            value: hargaFinal,
            currency: "IDR",
        });

    }, []);

    return (
        <div className={styles.emailContainer}>
            <MdEmail className={styles.emailIcon} />
            <h3>Pembayaran Berhasil 🎉</h3>
            <p>Produk kamu sudah dikirim ke email:</p>
            <strong>{formik.values.email}</strong>
            <p>Silakan cek inbox atau folder spam untuk mendapatkan produkmu.</p>
            <button onClick={handleClosePayment} className={styles.checkBtn}>
                Kembali ke Beranda
            </button>
        </div>
    )
}


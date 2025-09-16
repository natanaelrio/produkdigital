import styles from '@/component/form/notifikasiSuccess.module.css'
import { trackEvent } from '@/utils/facebookPixel';
import { useEffect } from 'react';
import { MdEmail } from "react-icons/md";

export default function NotifikasiSuccess({ formik, handleClosePayment, hargaFinal, merchantOrderId, title }) {

    console.log('sukses', merchantOrderId);

    useEffect(() => {
        trackEvent('Purchase', {
            content_ids: [merchantOrderId],
            content_name: title,
            value: hargaFinal + ".00",
            currency: "IDR",
            num_items: 1,
            content_type: 'product',
            contents:
                [{ "id": merchantOrderId, "quantity": 1, "delivery_category": "produk", "item_price": hargaFinal + ".00" }]
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


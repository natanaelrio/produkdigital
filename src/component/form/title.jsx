import styles from '@/component/form/paymentMethodPanel.module.css'
import { useBearLoading } from '@/zustand/zustand';

export default function Title({ handleClose, icon, title }) {
    const loading = useBearLoading((state) => state.loading)

    return (
        <div className={styles.headerForm}>
            <div className={styles.judul}>{title}</div>
            <button style={{ width: 'fit-content' }} onClick={handleClose} className={styles.closeBtn} disabled={loading}>
                {icon}
            </button>
        </div>
    )
}

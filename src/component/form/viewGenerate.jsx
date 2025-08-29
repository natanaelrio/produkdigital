import { useBearDataPayment, useBearChecking, useBearPaymentStatus } from '@/zustand/zustand';
import { FaRegCopy } from "react-icons/fa6";
import styles from '@/component/form/viewGenerate.module.css'
import { QRCodeCanvas } from 'qrcode.react';
import { Rupiah } from '@/utils/rupiah';
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';
import { initFacebookPixel } from '@/utils/facebookPixel';
import { useEffect } from 'react';

export default function ViewGenerate({ formik, hargaFinal, handleCheckStatus, data }) {
    useEffect(() => { initFacebookPixel() }, []);
    const router = useRouter();
    const dataPayment = useBearDataPayment((state) => state.dataPayment)
    const checking = useBearChecking((state) => state.checking)
    const paymentStatus = useBearPaymentStatus((state) => state.paymentStatus)

    const [formData, setFormData] = useState(null);
    console.log(formData);
    useEffect(() => {
        const savedForm = localStorage.getItem("formData");
        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
    }, []);
    const kirimWA = async () => {
        const waMessage = `
    Halo Invesdigi,

    Saya ${formData?.nama} (${formData?.email}) sudah mentransfer ke:
    BANK BCA - 0132248336 - Natanael Rio Wijaya
    
    Detail produk:
    - Produk : ${data?.title}
    - Harga  : ${Rupiah(hargaFinal)}
    
    Mohon segera diproses. Terima kasih.`;

        const { trackEvent } = await import('@/utils/facebookPixel');
        trackEvent('order', { order: Rupiah(hargaFinal) });

        router.push(`https://wa.me/${process.env.NEXT_PUBLIC_WA}?text=${encodeURIComponent(waMessage)}`);
        setLoading(false);
    }
    // CASE BCA → manual via WhatsApp

    return (
        <>
            {formik.values.paymentMethod === "qris" && dataPayment?.qrString && (
                <div className={styles.qrContainer}>
                    <QRCodeCanvas
                        value={dataPayment.qrString}
                        size={250}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                    />
                    <p className={styles.qrText}>
                        Scan kode QR di atas menggunakan aplikasi e-wallet kamu (Dana, OVO, Gopay, ShopeePay, dll)
                    </p>
                </div>
            )}

            {formik.values.paymentMethod !== "bca" && dataPayment?.vaNumber && (
                <div className={styles.qrContainer} onClick={() => { navigator.clipboard.writeText(dataPayment.vaNumber); alert(`VA Number ${formik.values.paymentMethod.toUpperCase()} disalin`) }}>
                    <h3>Virtual Account {formik.values.paymentMethod.toUpperCase()}</h3>
                    <div className={styles.rekeningItem}>
                        <button className={styles.vaNumber}>
                            {dataPayment.vaNumber}    <FaRegCopy />
                        </button>
                    </div>
                </div>
            )}

            {formik.values.paymentMethod === "bca" && (
                <div className={styles.bankInfo}>
                    <div className={styles.rekening}>
                        <div className={styles.rekeningItem}>
                            <div>
                                <strong>No. Rekening BCA</strong>
                                <div>0132248336 (Natanael Rio Wijaya)</div>
                            </div>
                            <button className={styles.copyBtn} onClick={() => { navigator.clipboard.writeText('0132248336'); alert('Nomor rekening telah disalin'); }}>
                                <FaRegCopy />
                            </button>
                        </div>
                        <div className={styles.rekeningItem}>
                            <div>
                                <strong>Jumlah Transfer</strong>
                                <div>{Rupiah(hargaFinal)}</div>
                            </div>
                            <button className={styles.copyBtn} onClick={() => { navigator.clipboard.writeText(hargaFinal.toString()); alert('Jumlah transfer disalin'); }}>
                                <FaRegCopy />
                            </button>
                        </div>
                    </div>

                </div>
            )}

            <div className={styles.qrDetail}>
                <div><strong>Produk:</strong> {data?.title}</div>
                <div><strong>Total:</strong> {Rupiah(hargaFinal)}</div>
            </div>

            {formik.values.paymentMethod == "bca" ?
                <button onClick={kirimWA} style={{ background: '#25d366' }} className={styles.btnWa}>
                    <FaWhatsapp fontSize={20} /> {`Kirim Bukti via WhatsApp`}
                </button>
                :
                <button onClick={handleCheckStatus} disabled={checking} className={styles.checkBtn}>
                    {checking ? "Mengecek..." : "Cek Status Pembayaran"}
                </button>
            }
            {paymentStatus && (
                <div className={styles.paymentStatus}>
                    <strong>Status:</strong> {paymentStatus}
                </div>
            )}
        </>
    )
}

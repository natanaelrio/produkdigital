import {
    useBearDataPayment,
    useBearChecking,
    useBearPaymentStatus,
    useBearPayment,
    useBearClose
} from '@/zustand/zustand';
import { FaRegCopy } from "react-icons/fa6";
import styles from '@/component/form/viewGenerate.module.css'
import { QRCodeCanvas } from 'qrcode.react';
import { Rupiah } from '@/utils/rupiah';
import { FaWhatsapp, FaDownload } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useState, useRef } from 'react';

export default function ViewGenerate({ formik, hargaFinal, handleCheckStatus, data }) {
    const router = useRouter();
    const dataPayment = useBearDataPayment((state) => state.dataPayment);
    const checking = useBearChecking((state) => state.checking);
    const setIsTrue = useBearClose((state) => state.setIsTrue);
    const setIsPayment = useBearPayment((state) => state.setIsPayment);
    const paymentStatus = useBearPaymentStatus((state) => state.paymentStatus);

    const [formData, setFormData] = useState(null);
    const [timeLeft, setTimeLeft] = useState(600); // 600 detik = 10 menit

    // 🔹 Ref untuk mengambil QR Canvas
    const qrRef = useRef(null);

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
        trackEvent('InitiateCheckout', {
            value: hargaFinal,
            currency: "IDR",
            num_items: 1
        });

        router.push(`https://wa.me/${process.env.NEXT_PUBLIC_WA}?text=${encodeURIComponent(waMessage)}`);
    };

    const HandleCloseTimer = () => {
        setIsTrue(false);
        setIsPayment(false);
    };

    // TIMER 10 MENIT OTOMATIS
    useEffect(() => {
        if (timeLeft <= 0) {
            HandleCloseTimer();
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    // Format menit:detik
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // 🔹 Fungsi untuk download QRIS
    const handleDownloadQR = () => {
        const canvas = qrRef.current.querySelector("canvas");
        if (!canvas) return;

        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `QRIS-${data?.title || 'payment'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            {/* TIMER HITUNG MUNDUR */}
            {/* {
                formik.values.paymentMethod !== "bca" || formik.values.paymentMethod !== "qris" && <div className={styles.timerBox}>
                    <p><strong>Batas Waktu Pembayaran:</strong></p>
                    <div className={styles.timer}>
                        {formatTime(timeLeft)}
                    </div>
                </div>
            } */}


            {formik.values.paymentMethod === "qris" && dataPayment?.qrString && (
                <div className={styles.qrContainer} ref={qrRef}>
                    <QRCodeCanvas
                        value={dataPayment.qrString}
                        size={200}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                    />
                    <p className={styles.qrText}>
                        Scan kode QR di atas menggunakan aplikasi e-wallet kamu (Dana, OVO, Gopay, ShopeePay, dll)
                    </p>

                    {/* 🔹 Tombol Download QR */}
                    <button
                        onClick={handleDownloadQR}
                        className={styles.downloadBtn}
                    >
                        <FaDownload /> Download QRIS
                    </button>
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
                <div className={styles.harga}><strong>Total:</strong> <div className={styles.hargadalam}>{Rupiah(hargaFinal)} </div> <div className={styles.hargalama}>{Rupiah(data?.price)}</div></div>
                <div><strong>Batas Promo:</strong> {formatTime(timeLeft)} Menit</div>
            </div>


            {formik.values.paymentMethod === "bca" ? (
                <button onClick={kirimWA} style={{ background: '#25d366' }} className={styles.btnWa}>
                    <FaWhatsapp fontSize={20} /> {`Kirim Bukti via WhatsApp`}
                </button>
            ) : (
                <>
                    <p className={styles.notifikasi}>Produk dikirim otomatis setelah pembayaran</p>
                    <button onClick={handleCheckStatus} disabled={checking} className={styles.checkBtn}>
                        {checking ? "Mengecek..." : "Cek Status Pembayaran"}
                    </button>
                </>
            )}

            {paymentStatus && (
                <div className={styles.paymentStatus}>
                    <strong>Status:</strong> {paymentStatus}
                </div>
            )}
        </div>
    );
}

import Terms from '@/component/a/terms'
import Header from "@/component/header";
import Notifikasi from "@/component/notifikasi";
import Footer from "@/component/footer";

export const metadata = {
    title: 'Syarat dan Ketentuan',
    description: 'Baca syarat dan ketentuan penggunaan produk digital kami. Halaman ini mencakup ketentuan hukum, hak dan kewajiban pengguna, serta penggunaan layanan secara bertanggung jawab.',
}

export default function Page() {
    return (
        <>
            <Header />
            <Terms />
        </>
    )
}

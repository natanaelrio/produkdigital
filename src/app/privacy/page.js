import Header from "@/component/header";
import Notifikasi from "@/component/notifikasi";
import Footer from "@/component/footer";
import Privacy from "@/component/a/privacy";

export const metadata = {
  title: 'Kebijakan Privasi',
  description: 'Halaman kebijakan privasi untuk produk digital kami. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan layanan dan produk digital kami.',
}


export default function Page() {
    return (
        <div style={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Notifikasi />
            <div style={{ flex: 'auto' }}>
                <Header />
                <Privacy />
            </div>
            <Footer />
        </div>
    )
}
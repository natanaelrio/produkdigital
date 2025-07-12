import Header from "@/component/header";
import Notifikasi from "@/component/notifikasi";
import Footer from "@/component/footer";
import Contact from "@/component/a/contact";

export const metadata = {
    title: 'Hubungi Saya',
    description: 'Ingin terhubung atau bertanya seputar produk digital saya? Silakan hubungi melalui email, media sosial, atau formulir kontak yang tersedia di halaman ini.',
}


export default function Page() {
    return (
        <div style={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Notifikasi />
            <div style={{ flex: 'auto' }}>
                <Header />
                <Contact />
            </div>
            <Footer />
        </div>
    )
}
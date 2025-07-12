import Header from "@/component/header";
import Notifikasi from "@/component/notifikasi";
import Footer from "@/component/footer";
import About from "@/component/a/about";

export const metadata = {
    title: 'Tentang Saya',
    description: 'Kenali lebih dekat pembuat produk digital ini. Saya menciptakan solusi digital yang praktis, efisien, dan bermanfaat untuk mempermudah pekerjaan serta meningkatkan produktivitas pengguna.',
}


export default function Page() {
    return (
        <div style={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Notifikasi />
            <div style={{ flex: 'auto' }}>
                <Header />
                <About />
            </div>
            <Footer />
        </div>
    )
}
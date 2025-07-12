export async function GET(req) {
    const authorization = req.headers.get('authorization')
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (authorization == process.env.API_KEY_SECRET) {
        const res = [
            {
                id: 1,
                date: "2025-07-10",
                stock: 100,
                sold: 20,
                title: "Template CV Profesional",
                slug: "template-cv-profesional",
                deskripsi: `<p>Template CV profesional ini dirancang khusus untuk membantu Anda menonjol di antara pelamar lainnya. Dengan desain modern dan elegan, Anda dapat menyusun pengalaman kerja, pendidikan, dan keahlian dengan rapi serta menarik.</p><p>Template ini dilengkapi panduan penggunaan dan dapat diedit di Word atau Google Docs. Cocok untuk berbagai industri, mulai dari kreatif, marketing, hingga korporasi. Investasi kecil yang dapat memberikan dampak besar dalam karier Anda.</p>`,
                price: 50000,
                diskon: 10,
                image: "https://picsum.photos/500"
            },
            {
                id: 2,
                date: "2025-07-08",
                stock: 50,
                sold: 15,
                title: "Preset Lightroom Minimalis",
                slug: "preset-lightroom-minimalis",
                deskripsi: `<p>Preset Lightroom minimalis ini dirancang bagi Anda yang ingin mempercantik feed media sosial dengan tone cerah dan konsisten. Cukup satu klik untuk mengubah tampilan foto menjadi lebih estetis dan profesional.</p><p>Dilengkapi file DNG yang kompatibel dengan Lightroom mobile maupun desktop, serta tutorial penggunaan bagi pemula. Cocok untuk konten fashion, travel, hingga lifestyle.</p>`,
                price: 30000,
                diskon: 20,
                image: "https://picsum.photos/500"
            },
            {
                id: 3,
                date: "2025-07-05",
                stock: 200,
                sold: 60,
                title: "Ebook Cara Sukses Bisnis Online",
                slug: "ebook-cara-sukses-bisnis-online",
                deskripsi: `<p>Ebook ini membahas cara membangun bisnis online dari nol hingga menghasilkan omset jutaan. Materi meliputi strategi memilih produk, memasarkan di sosial media, hingga mengelola toko online.</p><p>Ditulis oleh praktisi bisnis digital, ebook ini cocok untuk pemula maupun pelaku usaha yang ingin naik level. Langsung bisa dipraktikkan tanpa teori yang membingungkan.</p>`,
                price: 75000,
                diskon: 15,
                image: "https://picsum.photos/500"
            },
            {
                id: 4,
                date: "2025-07-03",
                stock: 80,
                sold: 25,
                title: "Font Handwritten Exclusive",
                slug: "font-handwritten-exclusive",
                deskripsi: `<p>Koleksi font handwriting eksklusif ini menghadirkan gaya tulisan tangan yang elegan dan alami. Sangat ideal untuk branding, undangan, label produk, atau konten sosial media.</p><p>Tersedia dalam format OTF & TTF dan kompatibel dengan Photoshop, Illustrator, hingga Canva. Membuat desain Anda lebih personal dan premium.</p>`,
                price: 40000,
                diskon: 5,
                image: "https://picsum.photos/500"
            },
            {
                id: 5,
                date: "2025-07-01",
                stock: 120,
                sold: 40,
                title: "Toolkit Desain Instagram",
                slug: "toolkit-desain-instagram",
                deskripsi: `<p>Toolkit ini menyediakan ratusan template feed, story, highlight cover, dan elemen grafis lainnya untuk mempercantik tampilan akun Instagram Anda. Semua desain mudah diedit di Canva atau Photoshop.</p><p>Sangat cocok untuk bisnis online, jasa, UMKM, maupun influencer yang ingin tampil lebih profesional di media sosial tanpa harus membuat desain dari nol.</p>`,
                price: 60000,
                diskon: 25,
                image: "https://picsum.photos/500"
            },
            {
                id: 6,
                date: "2025-06-28",
                stock: 90,
                sold: 30,
                title: "Mockup Kaos PSD",
                slug: "mockup-kaos-psd",
                deskripsi: `<p>Mockup kaos ini memiliki resolusi tinggi dengan efek bayangan realistis untuk menampilkan desain sablon secara profesional. Dapat digunakan untuk presentasi ke klien atau preview produk di toko online.</p><p>File dalam format PSD layered, memungkinkan Anda mengganti desain dan warna kaos dengan cepat menggunakan smart object. Hemat waktu dan tampil meyakinkan.</p>`,
                price: 55000,
                diskon: 0,
                image: "https://picsum.photos/500"
            },
            {
                id: 7,
                date: "2025-06-25",
                stock: 70,
                sold: 10,
                title: "Template Invoice Bisnis",
                slug: "template-invoice-bisnis",
                deskripsi: `<p>Template invoice ini dirancang untuk membantu pelaku usaha membuat tagihan pembayaran yang rapi dan profesional. Bisa diedit di Excel atau Google Sheets, lengkap dengan formula otomatis.</p><p>Tampilan elegan dan branding bisa disesuaikan dengan mudah. Solusi praktis untuk meningkatkan kredibilitas usaha dan pencatatan keuangan yang akurat.</p>`,
                price: 35000,
                diskon: 10,
                image: "https://picsum.photos/500"
            },
            {
                id: 8,
                date: "2025-06-23",
                stock: 60,
                sold: 22,
                title: "Sound Effect Cinematic",
                slug: "sound-effect-cinematic",
                deskripsi: `<p>Paket sound effect ini berisi lebih dari 100 audio cinematic berkualitas tinggi, seperti ambience, impact, riser, hingga transition. Ideal untuk video promosi, film pendek, maupun YouTube.</p><p>Format WAV dan MP3 memudahkan integrasi ke software editing seperti Premiere dan Final Cut. Tingkatkan kesan dramatis dan profesional pada konten video Anda.</p>`,
                price: 45000,
                diskon: 15,
                image: "https://picsum.photos/500"
            },
            {
                id: 9,
                date: "2025-06-20",
                stock: 40,
                sold: 8,
                title: "Icon Pack Flat Design",
                slug: "icon-pack-flat-design",
                deskripsi: `<p>Icon pack ini memuat lebih dari 500 ikon dengan gaya flat design yang clean dan minimalis. Cocok untuk web, aplikasi, presentasi, hingga infografik.</p><p>Tersedia dalam format SVG dan PNG, mudah dikustomisasi sesuai kebutuhan. Dapatkan konsistensi visual tanpa harus mendesain ulang ikon satu per satu.</p>`,
                price: 25000,
                diskon: 5,
                image: "https://picsum.photos/500"
            },
            {
                id: 10,
                date: "2025-06-18",
                stock: 100,
                sold: 50,
                title: "Intro Video After Effects",
                slug: "intro-video-after-effects",
                deskripsi: `<p>Template intro video ini dibuat menggunakan After Effects, sangat ideal untuk YouTube, Instagram Reels, maupun video promosi. Anda cukup mengganti logo dan teks sesuai kebutuhan.</p><p>Efek transisi dan animasi sudah dioptimasi untuk tampil menarik di berbagai platform. Tingkatkan kesan profesional dan branding video Anda secara instan.</p>`,
                price: 70000,
                diskon: 20,
                image: "https://picsum.photos/500"
            }
        ];


        const data = res.find((item) => item.slug == id)

        return new Response(JSON.stringify({ isCreated: true, data: data }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    return new Response(JSON.stringify({
        isCreated: false, data: [{
            "nama": "DEVeloper NatanaelRiowijaya",
            "Nomer": "08971041460"
        }
        ]
    }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });

}
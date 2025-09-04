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
        title: "Rahasia Menuju Trading Bebas Emosi",
        slug: "rahasia-menuju-trading-bebas-emosi",
        deskripsi: `<ul>
     Pelajari cara menguasai psikologi trading
     Bangun mindset pemenang di pasar yang fluktuatif
     Kendalikan emosi, maksimalkan hasil
     <br/>     <br/>
  </li>
  <li>
  <strong>
  Kata Pengantar
  </strong>
  </li>
  <li>Bertindak berdasarkan kepentingan utama anda</li>
   <br/>  
  <li>
   <strong>
  Bagian I – Kecakapan-Kecakapan Yang Anda Butuhkan
    </strong>
    <ul>
      <li>Bab 1 – Menetapkan dan Memenuhi Tujuan-Tujuan yang Realistis</li>
      <li>Bab 2 – Belajar Mencintai Kerugian</li>
      <li>Bab 3 – Waktu Tidak Ada Hubungannya Dengan Uang</li>
      <li>Bab 4 – Tetap Fleksibel</li>
      <li>Bab 5 – Apakah Anda Pantas Untuk Menghasilkan Uang</li>
      <li>Bab 6 – Aturan-Aturan Trading</li>
      <li>Bab 7 – Eksekusi Tanpa Cela</li>
      <li>Bab 8 – Kegunaan Dari Stop Order</li>
      <li>Bab 9 – Bagaimana Menangani Pasar Jika Ia Tidak Pernah Berhenti Bergerak</li>
      <li>Bab 10 – Menjadi Objektif</li>
      <li>Bab 11 – Menjadi Pemenang dan Orang Kalah Yang Aktif</li>
      <li>Bab 12 – Paper Trading Setelah Sebuah Kerugian</li>
      <li>Bab 13 – Pengembangan Diri</li>
    </ul>
  </li>
     <br/>  
  <li>
  <strong>
  Bagian II – Kecakapan-Kecakapan Yang Tidak Anda Butuhkan 
  </strong>
    <ul>
      <li>Bab 14 – Kesalahan Terburuk Yang Bisa Anda Lakukan</li>
      <li>Bab 15 – Trading Balas Dendam</li>
      <li>Bab 16 – Meminta, Berharap dan Berdoa</li>
      <li>Bab 17 – Menggandakan: Menambahkan Posisi Rugi</li>
      <li>Bab 18 – Ketamakan</li>
      <li>Bab 19 – Rasa Takut</li>
    </ul>
  </li>
       <br/> 
  <li>
    <strong>
  Bagian III – Bagaimana Mengembangkan Diri Anda
    </strong>
    <ul>
      <li>Bab 20 – Apakah Yang Dimaksud Dengan Psycho-Cybernetics?</li>
      <li>Bab 21 – Beberapa Gambaran Untuk Mempersiapkan Diri Anda</li>
      <li>Bab 22 – Gambaran-Gambaran Mental</li>
      <li>Bab 23 – Mekanisme Kesuksesan dan Mekanisme Kegagalan</li>
      <li>Bab 24 – Memaafkan</li>
      <li>Bab 25 – Orang-Orang Terkenal Menggunakan Psycho-Cybernetics</li>
      <li>Bab 26 – Bagaimana Memvisualisasikan Tehnik Untuk Memperbaiki Kemampuan Trading Anda</li>
      <li>Bab 27 – Latihan Menentukan Tujuan</li>
      <li>Bab 28 – Memvisualisasikan Keuntungan Besar Yang Tidak Disangka-Sangka</li>
      <li>Bab 29 – Pernyataan Kenaikan Ekuitas</li>
      <li>Bab 30 – Latihan Menarik Pelatuk</li>
      <li>Bab 31 – Latihan Membatasi Resiko</li>
      <li>Bab 32 – Membersihkan Kalkulator</li>
      <li>Bab 33 – Membuat Latihan Visualisasi Anda Sendiri</li>
      <li>Bab 34 – Lebih Banyak Lagi Latihan Relaksasi</li>
      <li>Bab 35 – Mengapa Teknik Visualisasi Berhasil</li>
    </ul>
  </li>
     <br/> 
  <li> <strong>Daftar Pustaka </strong></li>
</ul>
`,
        price: 90000,
        diskon: 50,
        image: `${process.env.NEXT_PUBLIC_URL}/rahasiamenujutradingbebasemosi2.webp`,
        linkProduk: "https://drive.google.com/file/d/1I4XTNCSfvHU1zLC7NGWLMY7P8gQDC0Vr/view?usp=sharing"
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
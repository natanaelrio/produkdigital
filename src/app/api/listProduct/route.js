export async function GET(req) {
  const authorization = req.headers.get('authorization')

  if (authorization == process.env.API_KEY_SECRET) {
    const res = [
      {
        id: 1,
        date: "2025-07-10",
        stock: 100,
        sold: 20,
        title: "Rahasia Menuju Trading Bebas Emosi",
        slug: "rahasia-menuju-trading-bebas-emosi",
        deskripsi: `Pelajari cara menguasai psikologi trading
Bangun mindset pemenang di pasar yang fluktuatif
Kendalikan emosi, maksimalkan hasil
`,
        price: 50000,
        diskon: 10,
        image: `${process.env.NEXT_PUBLIC_URL}/rahasiamenujutradingbebasemosi.png`,
        linkProduk: "https://invesdigi.vercel.app/produk/template-cv-profesional"
      }

    ];

    return new Response(JSON.stringify({ isCreated: true, data: res }), {
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
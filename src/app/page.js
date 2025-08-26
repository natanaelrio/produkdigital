import ListContent from "@/component/listContent";
import { GetListProdutDigital } from "@/service/HandleListProduct";
import Testimoni from "@/component/testimoni";
import Faq from "@/component/faq";
import Banner from "@/component/Banner";

export const metadata = {
  title: 'Buku Digital Wawasan Luas',
  description: 'Buku Digital Wawasan Luas adalah sumber pengetahuan interaktif yang dirancang untuk memperluas wawasan pembaca dalam berbagai bidang, mulai dari sains, teknologi, sosial, hingga budaya. Dilengkapi dengan konten informatif dan mudah dipahami, buku ini cocok untuk pelajar, pendidik, dan siapa saja yang ingin terus belajar dan berkembang.',
}

export default async function Home() {
  const DataListProduk = await GetListProdutDigital()

  return (
    <>
      <Banner />
      <ListContent data={DataListProduk?.data} />
      <Testimoni />
      <Faq />
    </>
  );
}

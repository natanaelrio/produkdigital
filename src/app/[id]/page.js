import Notifikasi from "@/component/notifikasi";
import Footer from "@/component/footer";
import Content from "@/component/content";
import Header from "@/component/header";
import { GetDetailProdutDigital } from "@/service/HandleDetailProduct";
import { notFound } from "next/navigation";


export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${id}`
    // fetch data
    const product = await GetDetailProdutDigital(id)

    return {
        title: product.data.title,
        description: product.data.deskripsi,
        openGraph: {
            images: [product.image],
        },
        // keywords: product.data.title,
        alternates: {
            canonical: canonicalUrl,
        }
    }

}

export default async function page({ params }) {
    const data = await GetDetailProdutDigital(params?.id)

    if (data.data === undefined) {
        return notFound()
    }
    else
        return (
            <div style={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Notifikasi />
                <div style={{ flex: 'auto' }}>
                    <Header slug={params?.id} title={data.data.title} />
                    {/* {params.id} */}
                    <Content data={data?.data} />
                    {/* <ListContent /> */}
                </div>
                <Footer />
            </div>
        )


}
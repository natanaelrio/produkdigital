import Content from "@/component/content";
import { GetDetailProdutDigital } from "@/service/HandleDetailProduct";
import { notFound } from "next/navigation";

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const id = params.id

    const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${id}`
    // fetch data
    const product = await GetDetailProdutDigital(id)

    return {
        title: product?.data?.title,
        description: product?.data?.deskripsi,
        openGraph: {
            images: [product?.image],
        },
        // keywords: product?.data.title,
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

    const hargaFinal = data?.data?.price - ((data?.data?.price * data?.data?.diskon) / 100);

    return (
        <Content data={data?.data} hargaFinal={hargaFinal} />
    )
}
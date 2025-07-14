'use server'
import { revalidatePath } from 'next/cache';

export const GetDetailProdutDigital = async (e) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/detalProduct?id=${e}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.API_KEY_SECRET}`
            },
            next: {
                revalidate: 0
            }
        });
        return res.json()
    }
    catch (err) {
        console.log(err);
    }
    revalidatePath('/')
}

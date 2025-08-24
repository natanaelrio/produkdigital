'use server'
export async function HandlePayment(GabungData) {
    try {
        // DUITKU
        const resPayment = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/duitkupayment/get-token-qris`, {
            method: 'POST',
            body: JSON.stringify(GabungData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.API_KEY_SECRET}`
            },
            next: { revalidate: 0 }
        })
        const dataPayment = await resPayment.json()
        return dataPayment
    }
    catch (e) {
        console.log(e);
    }
}
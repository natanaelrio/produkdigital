export async function HandlePayment(GabungData) {
    try {
        // DUITKU
        const resPayment = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/duitkupayment/get-token`, {
            method: 'POST',
            body: JSON.stringify(GabungData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.NEXT_PUBLIC_SECREET}`
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
'use server'
export async function HandleCekPayment(GabungData) {
    const formData = new FormData();
    for (const key in GabungData) {
        formData.append(key, GabungData[key]);
    }
    try {
        // DUITKU
        const resPayment = await fetch(`https://www.invesdigi.com/api/duitkupayment/cek-payment`, {
            method: 'POST',
            body: formData,
            headers: {
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
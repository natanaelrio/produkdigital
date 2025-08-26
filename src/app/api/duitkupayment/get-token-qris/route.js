import { ResponseData } from "@/utils/responseData";
import crypto from "crypto";

export async function POST(req) {
    const authorization = req.headers.get('authorization')

    const {
        merchantOrderId,
        customerVaName,
        email,
        itemDetails,
        note,
        linkProduk,
        kodebank
    } = await req.json()

    const totalPrice = itemDetails.map((data) => data.price).reduce((acc, curr) => acc + curr, 0)
    const signature = crypto
        .createHash("md5")
        .update(process.env.SERVER_KODEMC + merchantOrderId + totalPrice + process.env.SERVER_KEYDUITKU)
        .digest("hex");

    const payload = {
        "merchantCode": process.env.SERVER_KODEMC,
        "paymentAmount": itemDetails.map((data) => data.price).reduce((acc, curr) => acc + curr, 0),
        "paymentMethod": kodebank, // contoh: "VC", "QRIS", "VA"
        merchantOrderId,
        "productDetails": note ? note : 'tidak ada catatan',
        customerVaName: customerVaName,
        email,
        itemDetails: itemDetails,
        "callbackUrl": `${process.env.NEXT_PUBLIC_URL}/api/duitkupayment`,
        "returnUrl": `${process.env.NEXT_PUBLIC_URL}`,
        signature,
        expiryPeriod: 10,
        "additionalParam": JSON.stringify({
            email: email,
            name: customerVaName,
            linkProduk: linkProduk
        })
    };

    const resDuitku = await fetch(process.env.NEXT_PUBLIC_QRIS, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    const data = await resDuitku.json()
    const res = await ResponseData(data, authorization)
    return res
}
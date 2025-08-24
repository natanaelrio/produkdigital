import { ResponseData } from "@/utils/responseData";
import crypto from "crypto";

export async function POST(req) {
    const authorization = req.headers.get('authorization')

    const { merchantOrderId } = await req.json()

    const signature = crypto
        .createHash("md5")
        .update(process.env.SERVER_KODEMC + merchantOrderId + process.env.SERVER_KEYDUITKU)
        .digest("hex");

    const payload = {
        "merchantCode": process.env.SERVER_KODEMC,
        "merchantOrderId": merchantOrderId,
        "signature": signature,
    };

    const resDuitku = await fetch(process.env.NEXT_PUBLIC_CEKPAYMENT, {
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
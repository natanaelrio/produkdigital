import CryptoJS from 'crypto-js';
import getJakartaUnixTimestamp from '@/utils/getJakartaUnixTimestamp';
import { ResponseData } from '@/utils/responseData';
import GetTimeQris from '@/utils/getTimeQris';
import crypto from "crypto";

export async function POST(req) {
    const authorization = req.headers.get('authorization')

    const {
        kodeBank,
        note,
        merchantOrderId,
        customerVaName,
        // phoneNumber,
        email,
        itemDetails,
        linkProduk,
    } = await req.json()

    const totalPrice = itemDetails.map((data) => data.price).reduce((acc, curr) => acc + curr, 0)
    const datetime = new Date().toISOString().slice(0, 19).replace("T", " ");
    const signature = crypto
        .createHash("sha256")
        .update(process.env.SERVER_KODEMC + totalPrice + datetime + process.env.SERVER_KEYDUITKU)
        .digest("hex");

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-duitku-signature': signature,
        'x-duitku-timestamp': datetime,
        'x-duitku-merchantcode': process.env.SERVER_KODEMC
    };


    console.log(process.env.SERVER_KODEMC);
    console.log(datetime);
    console.log(process.env.SERVER_KEYDUITKU);
    console.log(totalPrice);
    console.log(signature);
    


    const bodynya = {
        "paymentAmount": itemDetails.map((data) => data.price).reduce((acc, curr) => acc + curr, 0),
        "merchantOrderId": merchantOrderId,
        "productDetails": note ? note : 'tidak ada catatan',
        "additionalParam": JSON.stringify({
            email: email,
            name: customerVaName,
            linkProduk: linkProduk
        }),
        "customerVaName": customerVaName,
        "email": email,
        // "phoneNumber": phoneNumber,
        "itemDetails": itemDetails,
        "callbackUrl": `${process.env.NEXT_PUBLIC_URL}/api/duitkupayment`,
        "returnUrl": `${process.env.NEXT_PUBLIC_URL}`,
        "expiryPeriod": 60,
        "paymentMethod": "PS"
    }

    const resDuitku = await fetch("https://passport.duitku.com/webapi/api/merchant/v2/inquiry", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodynya)
    })

    const data = await resDuitku.json()
    return new Response(JSON.stringify({ isCreated: true, data: data }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
    // const res = await ResponseData(data, authorization)
    return res
}
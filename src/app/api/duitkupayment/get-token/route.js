import CryptoJS from 'crypto-js';
import getJakartaUnixTimestamp from '@/utils/getJakartaUnixTimestamp';
import { ResponseData } from '@/utils/responseData';

export async function POST(req) {
    const authorization = req.headers.get('authorization')

    const {
        kodeBank,
        note,
        merchantOrderId,
        customerVaName,
        phoneNumber,
        email,
        itemDetails,
        linkProduk,
    } = await req.json()

    const Timestamps = getJakartaUnixTimestamp()
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-duitku-signature': CryptoJS.SHA256(process.env.SERVER_KODEMC + Timestamps + process.env.SERVER_KEYDUITKU).toString(CryptoJS.enc.Hex),
        'x-duitku-timestamp': Timestamps,
        'x-duitku-merchantcode': process.env.SERVER_KODEMC
    };

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
        "phoneNumber": phoneNumber,
        "itemDetails": itemDetails,
        "callbackUrl": `${process.env.NEXT_PUBLIC_URL}/api/duitkupayment`,
        "returnUrl": `${process.env.NEXT_PUBLIC_URL}`,
        "expiryPeriod": 60,
        "paymentMethod": kodeBank
    }

    const resDuitku = await fetch(process.env.NEXT_PUBLIC_POSTDUITKU, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(bodynya)
    })

    const data = await resDuitku.json()
    const res = await ResponseData(data, authorization)
    return res
}
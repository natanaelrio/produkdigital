import nodemailer from 'nodemailer';
import CryptoJS from 'crypto-js';
import { Rupiah } from '@/utils/rupiah';

export async function POST(req, res) {
  const data = await req.formData()
  const merchantCode = data.get('merchantCode')
  const merchantOrderId = data.get('merchantOrderId')
  const productDetail = data.get('productDetail')
  const amount = data.get('amount')
  const signature = data.get('signature')
  const additionalParam = data.get('additionalParam')

  const params = merchantCode + Number(amount) + merchantOrderId + process.env.SERVER_KEYDUITKU;
  const calcSignature = CryptoJS.MD5(params).toString();
  if (signature == calcSignature) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'invesdigi.official@gmail.com',
        pass: process.env.SERVER_KEYGOOGLE,
      },
    });

    const mailOptions = {
      from: 'invesdigi.official@gmail.com',
      to: additionalParam.email,
      subject: `Pembayaran Sukses - Order`,
      html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.05);">
    
    <div style="text-align: center;">
      <img src="https://invesdigi.vercel.app/logo.png" alt="Invesdigi Logo" width="100" style="margin-bottom: 20px;" />
      <h2 style="color: #333;">Pembayaran Anda Berhasil!</h2>
      <p style="font-size: 16px; color: #555;">Halo <strong>${additionalParam.name}Pelanggan Invesdigi</strong>,</p>
      <p style="font-size: 16px; color: #555;">Terima kasih telah melakukan pembelian di Invesdigi. Kami telah menerima pembayaran Anda dan pesanan Anda sedang diproses.</p>
    </div>

    <div style="background-color: #f9f9f9; padding: 20px; margin: 30px 0; border-left: 4px solid #0055FF; border-radius: 8px;">
      <p style="margin: 0; font-size: 16px;"><strong>Produk:</strong> ${productDetail}</p>
      <p style="margin: 0; font-size: 16px;"><strong>Harga:</strong> ${Rupiah(amount)}</p>
      <p style="margin: 0; font-size: 16px;"><strong>Status:</strong> Pembayaran diterima</p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <a href="https://invesdigi.com/produk/template-cv-profesional" style="display: inline-block; background-color: #0055FF; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 16px;">
        Lihat & Unduh Produk
      </a>
    </div>

    <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 14px; color: #888; text-align: center;">
      Jika Anda memiliki pertanyaan, silakan balas email ini atau hubungi kami melalui <a href="mailto:invesdigi.official@gmail.com" style="color: #0055FF;">invesdigi.official@gmail.com</a>
    </p>
    
    <p style="text-align: center; font-size: 14px; color: #bbb;">&copy; 2025 Invesdigi. Semua hak dilindungi.</p>

  </div>
</div>
`};
    const data = await transporter.sendMail(mailOptions);
    return Response.json({ status: 'riooooooooooo', data })
  } else {
    return Response.json({ error: 'Bad Signature' });
  }

}



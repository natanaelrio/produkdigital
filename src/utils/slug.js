export function Slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // hapus karakter selain huruf, angka, spasi, dan tanda hubung
        .replace(/\s+/g, '-')     // ganti spasi dengan tanda hubung
        .replace(/-+/g, '-')      // ganti tanda hubung ganda jadi satu
        .trim();
}
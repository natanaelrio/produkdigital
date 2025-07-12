export function GetRandomNumber() {
    const chars = 'abcdefghijklmnopqrstuvwxyz123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return `DI-${result.toLocaleUpperCase()}`;
}


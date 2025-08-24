const GetTimeQris = () => {
    const date = new Date();

    // Sama seperti PHP date('Y-m-d H:i:s')
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

export default GetTimeQris;

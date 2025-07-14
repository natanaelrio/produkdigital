export async function ResponseData(data, authorization) {

    BigInt.prototype.toJSON = function () {
        return this.toString();
    };

    if (authorization == process.env.API_KEY_SECRET) {
        try {
            const users = data
            if (users) {
                return new Response(JSON.stringify({ isCreated: true, data: users }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            } else return new Response(JSON.stringify({ isCreated: false }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            })
        }
        catch (e) {
            return new Response(JSON.stringify({ isCreated: false }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            })
        }
    }

    else
        return new Response(JSON.stringify({ isCreated: false, contact: 'natanael rio wijaya 08971041460' }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
}
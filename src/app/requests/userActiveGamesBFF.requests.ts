
export async function sendRequest(url: string, token: string, method: string, body: string):Promise<Response> {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: body
    });
}
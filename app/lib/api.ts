export async function getAgrees(key: string) {
    const url = '/api/accept';
    const data = { key: key };

    if(key != 'demo') {
        return {success: false};
    }

    try {
        const response = await fetch(url, {
            method: "POST", 
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return {success: false};
    }
}
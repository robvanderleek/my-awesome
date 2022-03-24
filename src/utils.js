export async function apiGet(url) {
    const response = await fetch(url);
    if (response.ok) {
        return await response.text();
    } else {
        return undefined;
    }
}
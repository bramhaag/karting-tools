const API_KEY = "AIzaSyDEbWVHEEoggTF2UVWHxkG5q2LXDJ93xtk"
const API_URL = "https://www.googleapis.com/youtube/v3"

export async function getVideo(id: string) {
    const result = await fetch(`${API_URL}/videos?id=${id}&part=snippet&key=${API_KEY}`)
    if (!result || !result.ok) {
        throw Error(result.statusText);
    }

    const data = await result.json()
    return data.items[0]
}
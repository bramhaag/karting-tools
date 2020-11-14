const API_KEY = "AIzaSyDEbWVHEEoggTF2UVWHxkG5q2LXDJ93xtk"
const API_URL = "https://www.googleapis.com/youtube/v3"

const ID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|vi|e(?:mbed)?)\/|\S*?[?&]v=|\S*?[?&]vi=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export async function getVideo(id: string) {
    const result = await fetch(`${API_URL}/videos?id=${id}&part=snippet&key=${API_KEY}`)
    if (!result || !result.ok) {
        throw Error(result.statusText);
    }

    const data = await result.json()
    return data.items[0]
}

export function getId(url: string) {
    const match = ID_REGEX.exec(url)
    if (match && 1 in match) {
        return match[1]
    }

    return null
}
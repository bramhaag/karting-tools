import { Lap } from "../components/video/controls/video_controls";
import { getVideo } from "./youtube_util";

export function padTime(time: string) {
    const parts = time.split(".")
    const remainder = parts[0].split(":")

    let result = "";

    // Pad the result with the missing "00:"s
    const padding = 3 - remainder.length
    if (padding > 0) {
        result = "00:".repeat(padding)
    }

    // Pad the parts of the timestring with 0s.
    result += remainder
        .map(n => `0${n}`.slice(-2))
        .join(":")

    // Append millis
    if (1 in parts) {
        result += `.${parts[1]}`
    }

    return result;
}

export function toMillis(time: string) {
    time = padTime(time)
    return Date.parse(`01-01-1970 ${time} UTC`)
}

export function toHuman(time: number) {
	const minutes = Math.floor(time / 60_000);
	const seconds = Math.floor(time / 1000) % 60;
	const millis = time % 1000;

	let result = ""
	if (minutes > 0) result += minutes.toString().padStart(2, '0') + ":"
	result += `${seconds.toString().padStart(2, '0')}.${millis.toString().padStart(3, '0')}`

    return result
}

export async function getLaps(id: string) {
    const lapRegex = /((\d\d:)?\d\d:\d\d) Lap \d+:\s(.+)/
    const video = await getVideo(id)
    const description: Array<string> = video.snippet.description.split(/[\r\n]+/)
    const laps: Array<Lap> = []

    let currentTime = 0;

    let i = 0
    description.forEach(line => {
        let match = lapRegex.exec(line);
        if (match === null) {
            return;
        }

        let timeString = match[3].split(/\s/)[0];
        const time = toMillis(timeString);

        if (currentTime === 0) {
            currentTime = toMillis(match[1])
        }

        laps.push({
            index: i++,
            start: currentTime / 1000,
            time: time / 1000
        });

        currentTime += time
    });

    return laps;
}

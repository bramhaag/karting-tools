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

    console.log("in: " + time)
    console.log("out: " + result)

    return result;
}

export function toMillis(time: string) {
    time = padTime(time)
    return Date.parse(`01-01-1970 ${time} UTC`)
}

export function toHuman(time: number, padZeros = true, withMillis = true, millisDelim = '.') {
    const date = new Date(0)
    date.setMilliseconds(time)

    const parts = [date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()]
    while (!padZeros && parts[0] === 0) {
        parts.shift()
    }

    let result = parts.map(part => `0${part}`.slice(-2)).join(":")

    if (withMillis) {
        result += millisDelim + date.getUTCMilliseconds()
    }

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
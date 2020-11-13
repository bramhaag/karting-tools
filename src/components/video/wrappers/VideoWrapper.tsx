import { Component, RefObject, createRef, h } from 'preact';
import VideoControls, { Lap } from '../controls/VideoControls'
import Video, { SeekAmount, SeekDirection } from '../Video'

export type VideoWrapperProps = {
    videoId: string,
}

export class VideoWrapper extends Component<VideoWrapperProps> {
    video: RefObject<Video> = createRef();
    controls: RefObject<VideoControls> = createRef();
    laps?: Array<Lap>
    currentLap?: Lap

    setLaps = (laps: Array<Lap>) => {
        this.laps = laps
        this.controls.current?.setState({ laps: laps })
    }

    setLap = (lap: Lap) => {
        this.video.current?.setState({ start: lap.start, end: lap.start + lap.time })
        this.currentLap = lap
        this.controls.current?.setLap(lap)
    }

    render({ videoId }: VideoWrapperProps) {
        return (
            <div className="column">
                <figure className="image is-16by9 mb-4">
                    <Video
                        ref={this.video}
                        videoId={videoId}
                        onPlay={() => this.controls.current?.setPlaying(true)}
                        onPause={() => this.controls.current?.setPlaying(false)}
                    />
                </figure>
                <VideoControls
                    ref={this.controls}
                    onLapChange={(lap) => this.setLap(lap)}
                    onPlay={() => this.video.current?.play()}
                    onPause={() => this.video.current?.pause()}
                    onSeek={(amount: SeekAmount, direction: SeekDirection) => this.video.current?.seekTo(amount, direction)} />
            </div>
        )
    }
}

export default VideoWrapper

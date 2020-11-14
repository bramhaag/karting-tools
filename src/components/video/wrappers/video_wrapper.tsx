import { Component, RefObject, createRef, h } from 'preact';
import VideoControls, { Lap } from '../controls/video_controls'
import Video, { SeekAmount, SeekDirection } from '../video'

export type VideoWrapperProps = {
    videoId: string,
    onPlay: () => void
    onPause: () => void
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

    onVideoPlay = () => {
        this.controls.current?.setPlaying(true)
        this.props.onPlay()
    }

    onVideoPause = () => {
        this.controls.current?.setPlaying(false)
        this.props.onPause()
    }

    render({ videoId }: VideoWrapperProps) {
        return (
            <div className="column">
                <figure className="image is-16by9 mb-4">
                    <Video
                        ref={this.video}
                        videoId={videoId}
                        onPlay={() => this.onVideoPlay()}
                        onPause={() => this.onVideoPause()}
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

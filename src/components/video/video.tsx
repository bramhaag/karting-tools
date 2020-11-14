import { Component, h } from 'preact'
import YouTube, { PlayerVars } from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'

const LAP_MARGIN = 1

export type SeekAmount = {
    seconds?: number,
    frames?: number
}

export enum SeekDirection {
    REWIND = -1,
    FORWARD = 1
}

export type VideoProps = {
    videoId: string,
    onPlay?: () => void
    onPause?: () => void
    fps?: number
}

export type VideoState = {
    start: number,
    end: number,
    offset: number
}

export class Video extends Component<VideoProps, VideoState> {
    private player: YouTubePlayer = {} as YouTubePlayer
    private shouldPause = true;
    private shouldReset = true;

    static defaultProps = {
        fps: 60,
    }

    readonly state = {
        start: 0,
        end: -1,
        offset: 0
    }

    initializePlayer = (e: { target: YouTubePlayer }) => {
        this.player = e.target;
        this.play()
        this.player.getIframe().parentElement?.getElementsByTagName("div")[0].remove()

        setInterval(this.tick, 10)
    }

    stateChanged = (e: { target: YouTubePlayer; data: number }) => {
        if (this.shouldPause && e.data === YouTube.PlayerState.PLAYING) {
            this.shouldPause = false;
            this.shouldReset = true;
            this.pause();
        }

        if (this.shouldReset && e.data === YouTube.PlayerState.PAUSED) {
            this.shouldReset = false;
            this.seekTo({ seconds: this.state.start + this.state.offset })
        }
    }

    play = () => this.player.playVideo();
    pause = () => this.player.pauseVideo();

    seekTo = (amount: SeekAmount, direction: SeekDirection | null = null) => {
        const seconds = amount.seconds ?? 0;
        const frames = (amount.frames ?? 0) / this.props.fps!;

        let seekTime = seconds + frames;
        if (direction != null) {
            seekTime = this.player.getCurrentTime() + direction * seekTime
        }

        this.player.seekTo(seekTime, true);
    }

    setPlaybackSpeed(speed: number) {
        this.player.setPlaybackRate(speed)
    }

    getTime(): number {
        return this.player.getCurrentTime();
    }

    componentDidUpdate() { 
        // Hack to remove empty <div class="has-ratio" /> that fucks up bulma for some reason
        if (typeof(this.player.getIframe) === 'function') 
        this.player.getIframe().parentElement?.getElementsByTagName("div")[0].remove()
    }

    private tick = () => {
        let { start, end, offset } = this.state;
        end = (end === -1) ? this.player.getDuration() : end;

        if (this.player.getCurrentTime() + offset < (start - LAP_MARGIN - offset) || this.player.getCurrentTime() + offset > (end + offset + LAP_MARGIN)) {
            this.seekTo({ seconds: start });
            this.shouldPause = true;
        }
    }

    render({ videoId, onPlay, onPause }: VideoProps) {
        return (
            <YouTube
                containerClassName="yt-container"
                className="has-ratio"
                videoId={videoId}
                opts={{playerVars: playerSettings}} 
                onReady={this.initializePlayer}
                onStateChange={this.stateChanged}
                onPlay={onPlay}
                onPause={onPause}
            />
        )
    }
}

const playerSettings: PlayerVars = {
    autoplay: 1,
    disablekb: 1,
    enablejsapi: 1,
    modestbranding: 1,
    rel: 0
}

export default Video
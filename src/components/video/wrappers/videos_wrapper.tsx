import VideoWrapper from "./video_wrapper";
import GlobalVideoControls from "../controls/global_video_controls";
import { SeekAmount, SeekDirection } from "../video";
import { Component, RefObject, createRef, h, Fragment } from "preact";
import { getLaps } from "../../../util/lap_util";
import { History } from "history";
import { setQuery } from "../../../util/history_util";
import { Section } from "preact-bulma";

export type VideosWrapperProps = {
    targetId: string;
    opportunityId: string;
};

export class VideosWrapper extends Component<VideosWrapperProps> {
    targetLap: RefObject<VideoWrapper> = createRef();
    opportunityLap: RefObject<VideoWrapper> = createRef();
    controls: RefObject<GlobalVideoControls> = createRef();

    offset = 0;

    componentDidMount() {
        const { targetId, opportunityId } = this.props;

        const params = new URLSearchParams(window.location.search)
        console.log(params)

        const offset = params.get("offset")
        if (offset) {
            this.setOffset(Number(offset))
        }

        getLaps(targetId)
            .then(laps => this.targetLap.current?.setLaps(laps))
            .then(() => {
                const targetLapIndex = params.get("tlap") ?? "0"
                const lap = this.targetLap.current?.laps?.[Number(targetLapIndex)]
                if (lap) {
                    this.targetLap.current?.setLap(lap)
                }
            });

        getLaps(opportunityId)
            .then(laps => this.opportunityLap.current?.setLaps(laps))
            .then(() => {
                const opportunityLapIndex = params.get("olap") ?? "0"
                const lap = this.opportunityLap.current?.laps?.[Number(opportunityLapIndex)]
                if (lap) {
                    this.opportunityLap.current?.setLap(lap)
                }
            });
    }

    playAll = () => {
        this.targetLap.current?.video.current?.play();
        this.opportunityLap.current?.video.current?.play();

        this.controls.current?.setPlaying(true);
    };

    pauseAll = () => {
        this.targetLap.current?.video.current?.pause();
        this.opportunityLap.current?.video.current?.pause();

        this.controls.current?.setPlaying(false);

        this.resync();
    };

    seekAll = (amount: SeekAmount, direction: SeekDirection) => {
        this.targetLap.current?.video.current?.seekTo(amount, direction);
        this.opportunityLap.current?.video.current?.seekTo(amount, direction);
    };

    changePlaybackSpeed = (speed: number) => {
        this.targetLap.current?.video.current?.setPlaybackSpeed(speed);
        this.opportunityLap.current?.video.current?.setPlaybackSpeed(speed);
    };

    setOffset = (offset: number) => {
        this.offset = offset;
        this.opportunityLap.current?.video?.current?.setState({
            offset: this.offset
        });
    }

    sync = () => {
        this.pauseAll();

        const targetTime = this.targetLap.current?.video.current?.getTime()!;
        const opportunityTime = this.opportunityLap.current?.video.current?.getTime()!;

        const currentTargetLap = this.targetLap.current?.currentLap!;
        const currentOpportunityLap = this.opportunityLap.current?.currentLap!;

        const targetOffset = targetTime - currentTargetLap.start;
        const opportunityOffset = opportunityTime - currentOpportunityLap.start;

        this.setOffset(opportunityOffset - targetOffset)

        setQuery("offset", this.offset.toString())
        setQuery("tlap", this.targetLap.current?.currentLap?.index.toString() ?? "0")
        setQuery("olap", this.opportunityLap.current?.currentLap?.index.toString() ?? "0")

        this.resync();
    };

    resync = () => {
        const targetTime = this.targetLap.current?.video.current?.getTime()!;

        const currentTargetLap = this.targetLap.current?.currentLap!;
        const currentOpportunityLap = this.opportunityLap.current?.currentLap!;

        const targetOffset = targetTime - currentTargetLap.start;
        const opportunityOffset = targetOffset + this.offset;

        this.opportunityLap.current?.video?.current?.seekTo({
            seconds: currentOpportunityLap.start + opportunityOffset
        });
    };

    reset = () => {
        const currentTargetLap = this.targetLap.current?.currentLap!;
        const currentOpportunityLap = this.opportunityLap.current?.currentLap!;

        this.targetLap.current?.video.current?.seekTo({
            seconds: currentTargetLap.start
        });
        this.opportunityLap.current?.video.current?.seekTo({
            seconds: currentOpportunityLap.start + this.offset
        });
    };

    render({ targetId, opportunityId }: VideosWrapperProps) {
        return (
            <Fragment>
                <Section>
                    <div className="columns is-centered">
                        <VideoWrapper
                            ref={this.targetLap}
                            videoId={targetId} />
                        <VideoWrapper
                            ref={this.opportunityLap}
                            videoId={opportunityId}
                        />
                    </div>
                </Section>
                <Section>
                    <GlobalVideoControls
                        ref={this.controls}
                        onPlay={this.playAll}
                        onPause={this.pauseAll}
                        onSeek={this.seekAll}
                        onPlaybackSpeedChange={this.changePlaybackSpeed}
                        onSync={this.sync}
                        onResync={this.resync}
                        onReset={this.reset}
                    />
                </Section>
            </Fragment>
        );
    }
}

export default VideosWrapper;

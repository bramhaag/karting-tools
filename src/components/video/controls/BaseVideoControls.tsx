import {
    faFastBackward,
    faBackward,
    faStepBackward,
    faPause,
    faPlay,
    faStepForward,
    faForward,
    faFastForward
} from "@fortawesome/free-solid-svg-icons";
import { Component, Fragment, h } from "preact";
import { SeekAmount, SeekDirection } from "../Video";
import ButtonControl from "./control/ButtonControl";

export type BaseVideoControlsProps = {
    onPlay: () => void;
    onPause: () => void;
    onSeek: (amount: SeekAmount, direction: SeekDirection) => void;
};

export type BaseVideoControlsState = {
    playing: boolean;
};

export class BaseVideoControls extends Component<
    BaseVideoControlsProps,
    BaseVideoControlsState
> {
    readonly state = {
        playing: false
    };

    render() {
        const { onPlay, onPause, onSeek } = this.props;
        const { playing } = this.state;

        return (
            <Fragment>
                <ButtonControl
                    onClick={() => onSeek({ seconds: 5 }, SeekDirection.REWIND)}
                    icon={faFastBackward}
                    tooltip="Rewind 5 seconds"
                />
                <ButtonControl
                    onClick={() => onSeek({ seconds: 1 }, SeekDirection.REWIND)}
                    icon={faBackward}
                    tooltip="Rewind 1 second"
                />
                <ButtonControl
                    onClick={() => onSeek({ frames: 1 }, SeekDirection.REWIND)}
                    icon={faStepBackward}
                    tooltip="Rewind 1 frame"
                />

                {playing ? (
                    <ButtonControl
                        onClick={onPause}
                        icon={faPause}
                        tooltip="Pause"
                    />
                ) : (
                    <ButtonControl
                        onClick={onPlay}
                        icon={faPlay}
                        tooltip="Play"
                    />
                )}

                <ButtonControl
                    onClick={() => onSeek({ frames: 1 }, SeekDirection.FORWARD)}
                    icon={faStepForward}
                    tooltip="Forward 1 frame"
                />
                <ButtonControl
                    onClick={() =>
                        onSeek({ seconds: 1 }, SeekDirection.FORWARD)
                    }
                    icon={faForward}
                    tooltip="Forward 1 second"
                />
                <ButtonControl
                    onClick={() =>
                        onSeek({ seconds: 5 }, SeekDirection.FORWARD)
                    }
                    icon={faFastForward}
                    tooltip="Forward 5 seconds"
                />
            </Fragment>
        );
    }
}

export default BaseVideoControls;

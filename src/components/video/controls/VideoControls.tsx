import { Component, createRef, h, RefObject } from 'preact'
import BaseVideoControls, { BaseVideoControlsProps } from './BaseVideoControls'
import SelectControl from './control/SelectControl'
import { toHuman } from '../../../util/lap_util'

export type Lap = {
    index: number
    start: number,
    time: number
}

export type VideoControlsProps = {
    onLapChange: (lap: Lap) => void
} & BaseVideoControlsProps

export type VideoControlsState = {
    laps: Array<Lap>,
    active: number
}

export class VideoControls extends Component<VideoControlsProps, VideoControlsState> {
    baseControls: RefObject<BaseVideoControls> = createRef();
    selectControl: RefObject<SelectControl> = createRef();

    readonly state: VideoControlsState = {
        laps: [],
        active: 0
    }

    setPlaying(playing: boolean) {
        this.baseControls.current?.setState({ playing: playing })
    }

    setLap(lap: Lap) {
        this.setState({
            active: lap.index
        })
    }

    render({ onLapChange }: VideoControlsProps, { laps, active }: VideoControlsState) {
        let items;
        if (laps.length == 0) {
            items = [{ value: "-1", text: `No laps found` }]
        } else {
            items = laps.map((lap, i) => ({
                value: i.toString(),
                text: `Lap ${i + 1}: ${toHuman(lap.time * 1000, false)}`,
                selected: lap.index == active
            }));
        }

        return (
            <div className="columns is-centered is-gapless">
                <SelectControl
                    ref={this.selectControl}
                    onSelect={(i) => onLapChange(laps[Number(i)])}
                    items={items}
                    tooltip="Select lap" />
                <BaseVideoControls ref={this.baseControls} {...this.props} />
            </div>
        )
    }
}

export default VideoControls

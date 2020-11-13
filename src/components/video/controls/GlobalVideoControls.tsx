import { faStopwatch, faSync, faRedo } from '@fortawesome/free-solid-svg-icons';
import { h, Component, RefObject, createRef } from 'preact';
import BaseVideoControls, { BaseVideoControlsProps } from './BaseVideoControls'
import ButtonControl from './control/ButtonControl';
import SelectControl, { SelectItem } from './control/SelectControl'

export type GlobalVideoControlsProps = {
    playbackSpeeds?: Array<number>
    onPlaybackSpeedChange: (speed: number) => void
    onSync: () => void
    onResync: () => void
    onReset: () => void
} & BaseVideoControlsProps

export class GlobalVideoControls extends Component<GlobalVideoControlsProps> {
    baseControls: RefObject<BaseVideoControls> = createRef();

    static defaultProps = {
        playbackSpeeds: [0.25, 0.5, 1, 1.5, 2]
    }

    setPlaying(playing: boolean) {
        this.baseControls.current?.setState({ playing: playing })
    }

    render({ playbackSpeeds, onPlaybackSpeedChange, onSync, onResync, onReset }: GlobalVideoControlsProps) {
        const items: Array<SelectItem> = playbackSpeeds!.map(speed => ({ 
            value: speed.toString(), 
            text: `${speed}x`, selected: speed == 1 
        }))

        return (
            <div>
                <div style={{width: "fit-content", margin: "auto"}}>
                    <ButtonControl onClick={onSync} icon={faStopwatch} tooltip="Sync videos" text="Sync videos" color="is-info" />
                </div>
                <div className="columns is-centered is-gapless">
                    <ButtonControl onClick={onResync} icon={faSync} tooltip="Resync videos" />
                    <BaseVideoControls ref={this.baseControls} {...this.props} />
                    <SelectControl
                        onSelect={speed => onPlaybackSpeedChange(Number(speed))}
                        items={items}
                        tooltip="Set playback speed" />
                    <ButtonControl onClick={onReset} icon={faRedo} tooltip="Go to the start of the lap" />
                </div>
            </div>
        )
    }
}

export default GlobalVideoControls

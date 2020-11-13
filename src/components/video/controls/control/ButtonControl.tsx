import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Component, h } from 'preact'
import classNames from 'classnames'

export type ButtonControlProps = {
    onClick: () => void,
    icon: IconProp,
    tooltip: string,
    text?: string,
    color?: string
}

export class ButtonControl extends Component<ButtonControlProps> {
    static defaultProps = {
        color: "",
        text: ""
    }


    render() {
        const { onClick, icon, tooltip, text, color } = this.props

        const buttonClasses = classNames({
            [`${color}`]: color
        }, "button")

        const buttonText = !text ? " " + text : ""

        return (
            <div className="column is-narrow">
                <button className={buttonClasses} onClick={onClick} data-tooltip={tooltip}><FontAwesomeIcon icon={icon} />{buttonText}</button>
            </div>
        )
    }
}

export default ButtonControl

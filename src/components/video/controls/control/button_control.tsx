import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Component, h } from "preact";
import { Button } from "preact-bulma";

export type ButtonControlProps = {
    onClick: () => void;
    icon: IconProp;
    tooltip: string;
    text?: string;
    color?: string;
};

export class ButtonControl extends Component<ButtonControlProps> {
    render({ onClick, icon, tooltip, text, color }: ButtonControlProps) {
        const buttonText = text ? <span>&nbsp;{text}</span> : "";

        return (
            <div className="column is-narrow" data-tooltip={tooltip}>
                <Button color={color} onClick={onClick}>
                    <FontAwesomeIcon icon={icon} />
                    {buttonText}
                </Button>
            </div>
        );
    }
}

export default ButtonControl;

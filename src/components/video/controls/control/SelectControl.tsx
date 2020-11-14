import { Component, h } from "preact";

export type SelectItem = {
    value: string;
    text: string;
    selected?: boolean;
};

export type SelectControlProps = {
    onSelect: (value: string) => void;
    tooltip: string;
    items: Array<SelectItem>;
};

export class SelectControl extends Component<SelectControlProps> {
    render({ onSelect, tooltip, items }: SelectControlProps) {
        return (
            <div className="column is-narrow">
                <div className="select" data-tooltip={tooltip}>
                    <select onChange={e => onSelect(e.currentTarget.value)}>
                        {items.map((item, i) => (
                            <option key={i} value={item.value} selected={item.selected}>
                                {item.text}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}

export default SelectControl;

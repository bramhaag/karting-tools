import { Component, h } from 'preact'

export type SelectItem = {
    value: any
    text: any
    selected?: boolean
}

export type SelectControlProps = {
    items: Array<SelectItem>
    onSelect: (value: string) => void
}

export class SelectControl extends Component<SelectControlProps> {
    render() {
        const { items, onSelect } = this.props

        return (
            <div className="column is-narrow">
                <div className="select">
                    <select onChange={e => onSelect(e.currentTarget.value)}>
                        {items.map((item, i) => <option key={i} value={item.value} selected={item.selected}>{item.text}</option>)}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectControl

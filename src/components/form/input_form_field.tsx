import { FunctionalComponent, h } from "preact"

export type InputFormFieldProps = {
    name: string,
    label: string,
    placeholder: string
    onChange: (value: string) => void
    type?: string
}

export const InputFormField: FunctionalComponent<InputFormFieldProps> = ({ name, label, placeholder, onChange, type }: InputFormFieldProps) => {
    return (
        <div class="field">
            <label class="label">{label}</label>
            <div class="control">
                <input name={name} class="input" type={type ?? "text"} placeholder={placeholder} onChange={e => onChange((e.target as HTMLInputElement).value)} />
            </div>
        </div>
    )
}

export default InputFormField

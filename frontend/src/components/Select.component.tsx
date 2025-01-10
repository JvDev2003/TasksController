import { ISelect } from "../interfaces/Select.props"

const Select: React.FC<ISelect> = ({ name, onChange, options, value }: ISelect) => {
    return (
        <select
            name={name}
            id={name}
            className="fullSizeInput"
            value={value}
            onChange={onChange}
        >
            {options && options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))
            }
        </select>
    )
}

export default Select
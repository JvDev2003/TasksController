import { useState } from "react"
import { PInterval } from "../interfaces/Interval.props"

const Interval: React.FC<PInterval> = ({ value, addInterval, removeInterval }: PInterval) => {
    const [initial, setInitial] = useState('00:00')
    const [end, setEnd] = useState('00:00')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!initial || !end) {
            return false
        }
        if (initial === '00:00' && end === '00:00') {
            return false
        }

        addInterval({ initial, end })
    }

    const handleDelete = (index: number) => {
        removeInterval(index)
    }

    return (
        <div>
            <ul>
                {value && value.length > 0 && value.map((val, index) => (
                    <li key={index} onClick={() => handleDelete(index)}>{val.initial} - {val.end}</li>
                ))}
            </ul>
            <div>
                <label>
                    <span>Initial  </span>
                    <input
                        type="time"
                        name="initial"
                        id="initial"
                        value={initial || '00:00'}
                        onChange={(e) => setInitial(e.target.value)}
                    />
                </label>
                <label>
                    <span>End  </span>
                    <input
                        type="time"
                        name="end"
                        id="end"
                        value={end || '00:00'}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                    <button onClick={handleClick}>Add</button>
                </label>
            </div>
        </div>
    )
}

export default Interval
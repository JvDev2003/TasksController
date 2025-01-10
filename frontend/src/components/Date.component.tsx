import { IDate } from "../interfaces/Date.props";
import { useState } from "react";
import { today } from "../functions/date.functions";
import { week } from "../interfaces/Options";
const Date: React.FC<IDate> = ({ name, addDate, value, removeDate, isCalendar }: IDate) => {
    const [date, setDate] = useState<string>(value ? value[-1] : "");
    const [selectedDays, setSelectedDays] = useState<string[]>([])

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addDate(date);
    };


    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (selectedDays.includes(value)) {
            handleDelete(value);

            setSelectedDays((prevSelectedDays) =>
                prevSelectedDays.filter((day) => day !== value)
            );

        } else {
            setSelectedDays((prevSelectedDays: string[]) => {
                return [...prevSelectedDays, value];
            }
            );

            addDate(value)
        }

    };


    const handleDelete = (index: number | string) => {
        removeDate(index)
    }

    return (
        <div>
            {isCalendar && (
                <label>
                    <ul>
                        {value && value.length > 0 && value.map((val, index) => (
                            <li key={index} onClick={() => handleDelete(index)}>{val}</li>
                        ))}
                    </ul>
                    <input
                        type="date"
                        name={name}
                        id={name}
                        value={date || String(today)}
                        onChange={handleDateChange}
                    />
                    <button onClick={handleClick}>Add</button>
                </label>
            )}
            {!isCalendar && (
                <div className="days">
                    <div>
                        {week && week.map((day, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    name="day"
                                    id={day.toLowerCase()}
                                    value={day.toLowerCase()}
                                    onChange={handleCheckboxChange}
                                    checked={value.includes(day.toLocaleLowerCase())}
                                />
                                {day}
                            </label>
                        ))}

                    </div>
                </div>

            )}


        </div>
    );
}

export default Date
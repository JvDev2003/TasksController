import styles from "./CreateTasks.module.css";
import { useReducer, useEffect } from "react";
import { ITask } from "../interfaces/Task.interface";
import { ActionTask } from "../types/task.type";
import Select from "../components/Select.component";
import Date from "../components/Date.component";
import { isBeforeToday } from "../functions/date.functions";
import { frequencyOptions, difficultyOptions, priorityOptions } from "../interfaces/Options";
import Interval from "../components/Interval.component";
import { IInterval } from "../interfaces/Interval.interface";
import { validTime } from "../functions/time.functions";
import useTask from "../hooks/useTask";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { typeDates } from "../interfaces/Options";

const addDate = (dates: string[], date: string) => {
    if (dates.includes(date)) {
        return []
    }
    if (/(\d){4}\-(\d){2}\-(\d){2}/.test(date)) {
        if (isBeforeToday(date)) {
            return []
        }
    }
    return [date]
}

const addInterval = (intervals: IInterval[], interval: IInterval) => {
    for (const intv of intervals) {
        if (!validTime(interval, intv)) {
            return []
        }
    }

    return [interval]
}

const removeIndex = (values: any[], index: number | string) => {
    return values.filter((v, i) => {
        return index === i || index === v ? false : true
    })
}

function reducer(state: ITask, action: ActionTask) {
    //console.log(state)
    switch (action.type) {
        case 'setName':
            return { ...state, name: action.name };
        case 'setFrequency':
            return { ...state, frequency: action.frequency }
        case 'setDifficulty':
            return { ...state, difficulty: action.difficulty }
        case 'setPriority':
            return { ...state, priority: action.priority }
        case 'setReusable':
            return { ...state, reusable: (action.reusable === 'true' ? true : false) }
        case 'setDate':
            return { ...state, days: [...state.days, ...addDate(state.days, action.date)] }
        case 'removeDate':
            return { ...state, days: removeIndex(state.days, action.index) }
        case 'setInterval':
            return { ...state, time: [...state.time, ...addInterval(state.time, action.interval)] }
        case 'removeInterval':
            return { ...state, time: removeIndex(state.time, action.index) }
        case 'resetDate':
            return { ...state, days: [] }
        case 'setAll':
            return { ...action.data }
        case 'reset':
            return { ...action.data }
        default:
            return state

    }
}

const initialState: ITask = {
    name: "",
    frequency: "",
    days: [],
    time: [],
    reusable: false,
    difficulty: "",
    priority: ""
}

const CreateTasks = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { createTask, getTask, editTask, loading, error } = useTask()
    const [validation, setValidation] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const result = await getTask(id);
                    dispatch({ type: 'setAll', data: result });
                } catch (e) {
                    console.error(e);
                }
            };

            fetchData();
        } else {
            dispatch({ type: 'reset', data: initialState });
        }
    }, [id]);


    const verifyStateBeforeSubmit = ({ frequency, days, difficulty, priority, time }: ITask): boolean => {
        if (!frequency) {
            setValidation(`You need to select a frequency!`)
            return false
        }
        if (days.length === 0 && !typeDates.noDays.includes(frequency)) {
            setValidation(`You need to select at least one day!`)
            return false
        }
        if (!difficulty) {
            setValidation(`You need to select a difficulty!`)
            return false
        }
        if (!priority) {
            setValidation(`You need to select a priority!`)
            return false
        }
        if (time.length === 0) {
            setValidation(`You need to select at least one interval!`)
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!verifyStateBeforeSubmit(state)) { return false }
        try {
            if (id) {
                await editTask(id, state)
            } else {
                await createTask(state)
            }

            navigate("/task")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.container}>
            <h2>{id ? "Edit" : "Create"} Task</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.initialData}>
                    <label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            placeholder="Name"
                            required
                            value={state.name}
                            onChange={(e) => dispatch({ type: 'setName', name: e.target.value })}
                            className="fullSizeInput"
                        />
                    </label>
                    <label>
                        <Select
                            name="frequency"
                            onChange={(e) => {
                                dispatch({ type: 'setFrequency', frequency: e.target.value })
                                dispatch({ type: 'resetDate' })
                            }}
                            options={frequencyOptions}
                            value={state.frequency}
                        />
                    </label>
                </div>
                {state.frequency && !typeDates.noDays.includes(state.frequency) && (
                    <div className={styles.dates}>
                        <span>Dates</span>
                        <Date
                            name="date"
                            addDate={(date: string) => {
                                dispatch({ type: 'setDate', date: date })
                            }}
                            removeDate={(index: number | string) => {
                                dispatch({ type: 'removeDate', index: index })
                            }}
                            value={state.days}
                            isCalendar={typeDates.calendar.includes(state.frequency)}
                        />
                    </div>
                )
                }

                <div className={styles.time}>
                    <span>Interval</span>
                    <Interval
                        addInterval={(interval: IInterval) => {
                            dispatch({ type: 'setInterval', interval: interval })
                        }}
                        removeInterval={(index: number) => {
                            dispatch({ type: 'removeInterval', index: index })
                        }}
                        value={state.time}
                    />
                </div>
                <div className={styles.reusable}>
                    <div>Reusable?</div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="reusable"
                                value="true"
                                checked={state.reusable === true}
                                onChange={(e) => dispatch({ type: 'setReusable', reusable: e.target.value })}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="reusable"
                                value="false"
                                checked={state.reusable === false}
                                onChange={(e) => dispatch({ type: 'setReusable', reusable: e.target.value })}
                            />
                            No
                        </label>
                    </div>
                </div>
                <div className={styles.optional}>
                    <label>
                        <Select
                            name="difficulty"
                            onChange={(e) => dispatch({ type: 'setDifficulty', difficulty: e.target.value })}
                            options={difficultyOptions}
                            value={state.difficulty}
                        />
                    </label>
                    <label>
                        <Select
                            name="priority"
                            onChange={(e) => dispatch({ type: 'setPriority', priority: e.target.value })}
                            options={priorityOptions}
                            value={state.priority}
                        />
                    </label>
                </div>
                {error && <h2>{error}</h2>}
                {validation && <h2>{validation}</h2>}
                <input type="submit" value={loading ? "Loading..." : id ? "Edit" : "Create"} />
            </form>
        </div>
    )
}

export default CreateTasks
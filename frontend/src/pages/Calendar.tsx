import Details from "../components/Details.component"
import useCalendar from "../hooks/useCalendar"
import useTime from "../hooks/useTime"
import { MongoTask } from "../interfaces/Task.interface"
import styles from "./Calendar.module.css"
import { useState, useEffect } from "react"

const Calendar = () => {
    const { getCalendar, loading, error } = useCalendar()
    const [tasks, setTasks] = useState<MongoTask[][]>([])
    const { hour } = useTime()
    const [selected, setSelected] = useState(hour())

    useEffect(() => {
        const fetch = async () => {
            const fetchedData = await getCalendar()
            setTasks(fetchedData)
        }

        fetch()
    }, []);


    const handleClick = (index: number) => {
        setSelected(index)
    }


    return (
        <main className={styles.main}>
            <div>
                {
                    loading && <h2>Carregando</h2>
                }

                {
                    error && <h2>{error}</h2>
                }
                {
                    !loading && (
                        <ul>
                            {Array.from({ length: 24 }, (_, index) => (
                                <li
                                    key={index}
                                    className={selected === index ? styles.selected : styles.normal}
                                    onClick={() => handleClick(index)}
                                >
                                    <span>
                                        {index < 10 ? `0${index}:00` : `${index}:00`}
                                    </span>
                                    <div>
                                        {tasks && tasks[index] && tasks[index].map((task) => (
                                            <span key={task._id}>{task.name}</span>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }

            </div>
            <div className={styles.details}>
                {selected && tasks && tasks[selected] && tasks[selected].length === 0 && <h2>There is no tasks</h2>}
                {selected && tasks && tasks[selected] && tasks[selected].map((task) => (
                    <Details key={task._id} task={task} />
                ))}
            </div>
        </main>
    )
}

export default Calendar
import useTask from "../hooks/useTask"
import { useState, useEffect } from "react"
import { MongoTask } from "../interfaces/Task.interface"
import styles from "./Task.module.css"
import pencil from "../assets/pencil.png"
import trash from "../assets/trash.png"
import { typeDates } from "../interfaces/Options"
import { useNavigate } from "react-router-dom"

const Tasks = () => {
    const { getTasks, deleteTask, loading, error } = useTask()
    const [tasks, setTasks] = useState<MongoTask[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTasks()
                if (result) {
                    setTasks(result)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData()
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteTask(id)
            setTasks((prev) => {
                return prev.filter(task => {
                    return task._id !== id
                })
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleEdit = async (id: string) => {
        try {
            navigate(`/task/edit/${id}`)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.container}>
            <ul>
                {loading && <h2>Loading...</h2>}
                {error && <h2>{error}</h2>}
                {tasks && tasks.map((task) => (
                    <li key={task._id}>
                        <div className={styles.data}>
                            <p>Name: {task.name}</p>
                            <p>Frequency: {task.frequency}</p>
                            <p>Reusable: {task.reusable ? "true" : "false"}</p>
                            <p>Proproty: {task.priority}</p>
                            <p>Difficulty: {task.difficulty}</p>
                            {!typeDates.noDays.includes(task.frequency) && (
                                <>
                                    <p>Date: </p>
                                    <div className={styles.days}>
                                        {task.days.length >= 1 ? task.days.map((date, index) => (
                                            <span key={index}>{date}</span>
                                        )) : (
                                            <span>N/a</span>
                                        )
                                        }
                                    </div>
                                </>
                            )}
                            <span>Interval: </span>
                            <div className={styles.time}>
                                {task.time.length >= 1 ? task.time.map((int, index) => (
                                    <span key={index}>{int.initial} - {int.end}</span>
                                )) : (<span> N/a</span>)}
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={styles.delete}
                                onClick={() => handleDelete(task._id)}
                            >
                                <img src={trash} alt="delete button" />
                            </button>
                            <button
                                onClick={() => handleEdit(task._id)}
                            >
                                <img src={pencil} alt="edit button" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tasks
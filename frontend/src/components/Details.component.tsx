import { useNavigate } from "react-router-dom"
import { MongoTask } from "../interfaces/Task.interface"
import styles from "./Details.module.css"


const Details: React.FC<MongoTask> = (task: MongoTask) => {
    const navigate = useNavigate()

    const handleClick = () => {
        console.log("test")
        // navigate("/task/details/create")
    }

    const handleComplete = () => {
        try {
            console.log("complete task")
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.details} onClick={handleClick} onDoubleClick={handleComplete}>
            <h2>{task.name} {"->"} {task.time.map((t, i) => (<span key={i}>{t.initial} - {t.end} {i === task.time.length - 1 ? "" : " & "}</span>))}</h2>
            {
                task.days && task.days.length !== 0 && (
                    <span>Dates: {task.days}</span>
                )
            }
            <span>Frequency: {task.frequency}</span>
            <span>Difficulty: {task.difficulty}</span>
            <span>Priority: {task.priority}</span>
        </div>
    )
}

export default Details
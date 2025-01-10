import { useNavigate } from "react-router-dom"
import style from "./Menu.module.css"

const Menu = () => {
    const navigate = useNavigate()

    const handleMenu = (path: string) => {
        try {
            navigate(path)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <header className={style.header}>
            <h3>Tasks</h3>
            <nav>
                <ul>
                    <li><button onClick={() => handleMenu("/")}>Calendar</button></li>
                    <li><button onClick={() => handleMenu("/task")}>Tasks</button></li>
                    <li><button onClick={() => handleMenu("/task/create")}>Create Task</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Menu
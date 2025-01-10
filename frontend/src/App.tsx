import { Routes, Route, BrowserRouter } from "react-router-dom"
import Tasks from "./pages/Tasks"
import CreateTasks from "./pages/CreateTasks"
import Menu from "./components/Menu.compenent"
import Calendar from "./pages/Calendar"

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/task" element={<Tasks />} />
        <Route path="/task/create" element={<CreateTasks />} />
        <Route path="/task/edit/:id" element={<CreateTasks />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

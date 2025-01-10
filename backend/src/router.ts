// libs
import { Router, Request, Response } from "express";
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  getTasks,
} from "./controllers/task.controller";
import { getCalendar } from "./controllers/calendar.controller";

//ROUTER
const router = Router();

export default router
  .post("/task", createTask)
  .get("/task", getTasks)
  .get("/task/:id", getTask)
  .put("/task/:id", editTask)
  .delete("/task/:id", deleteTask)
  .get("/calendar", getCalendar);

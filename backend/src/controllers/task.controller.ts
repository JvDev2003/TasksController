import { Request, Response } from "express";
import Logger from "../../config/logger";
import { TaskSchema } from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      name,
      frequency,
      period,
      days,
      time,
      reusable,
      difficulty,
      priority,
    } = req.body;

    console.log(req.body);

    const task = await TaskSchema.create({
      name,
      frequency,
      period,
      days: [...days],
      time: [...time],
      reusable,
      difficulty,
      priority,
    });

    return res.status(201).json(task);
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await TaskSchema.findById(id);

    if (!task) {
      return res.status(404).json({ msg: "this task doesn't exist!" });
    }

    return res.status(200).json(task);
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskSchema.find({});

    if (!tasks) {
      return res.status(404).json({ msg: "no tasks were found" });
    }

    return res.status(200).json(tasks);
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      frequency,
      period,
      days,
      time,
      reusable,
      difficulty,
      priority,
    } = req.body;

    const task = await TaskSchema.findById(id);

    if (!task) {
      return res.status(404).json({ msg: "this task doesn't exist!" });
    }

    await task.updateOne({
      name,
      frequency,
      period,
      days,
      time,
      reusable,
      difficulty,
      priority,
    });

    return res.status(200).json(task);
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await TaskSchema.findById(id);

    if (!task) {
      return res.status(404).json({ msg: "this task doesn't exist!" });
    }

    await task.deleteOne();

    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

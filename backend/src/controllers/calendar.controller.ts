import { Request, Response } from "express";
import Logger from "../../config/logger";
import { TaskSchema } from "../models/task.model";
import { ITask, MongoTask } from "../interfaces/Task.interface";

export const getCalendar = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskSchema.find({});

    if (!tasks) {
      return res.status(404).json({ msg: "no tasks were found" });
    }

    let array: any[] = new Array(24).fill([]);

    tasks.map((task) => {
      task.time.map((interval) => {
        const { initial, end } = interval;

        const init = initial.split(":")[0];
        const ending = end.split(":")[0];

        for (let i = Number(init); i < Number(ending); i++) {
          array[i] = [...array[i], task];
        }
      });
    });

    console.log(array);

    return res.status(200).json(array);
  } catch (e: any) {
    Logger.error(e.message);
    return res
      .status(500)
      .json({ msg: "An error occurred, please try again later" });
  }
};

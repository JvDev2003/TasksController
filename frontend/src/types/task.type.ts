import { IInterval } from "../interfaces/Interval.interface";
import { ITask, MongoTask } from "../interfaces/Task.interface";

export type ActionTask =
  | { type: "setName"; name: string }
  | { type: "setFrequency"; frequency: string }
  | { type: "setDifficulty"; difficulty: string }
  | { type: "setPriority"; priority: string }
  | { type: "setReusable"; reusable: string }
  | { type: "setDate"; date: string }
  | { type: "setInterval"; interval: IInterval }
  | { type: "removeDate"; index: number | string }
  | { type: "removeInterval"; index: number }
  | { type: "resetDate" }
  | { type: "setAll"; data: MongoTask }
  | { type: "reset"; data: ITask };

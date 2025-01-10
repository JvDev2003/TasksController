import { IInterval } from "./Interval.interface";

export interface ITask {
  name: string;
  frequency: string;
  days: string[];
  time: IInterval[];
  reusable: boolean;
  difficulty: string;
  priority: string;
}

export interface MongoTask extends ITask {
  _id: string;
}

import { IInterval } from "./Interval.interface";

export interface PInterval {
  value: IInterval[];
  addInterval: (interval: { initial: string; end: string }) => void;
  removeInterval: (index: number) => void;
}

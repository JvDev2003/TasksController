import { IInterval } from "../interfaces/Interval.interface";

export const validTime = (
  interval1: IInterval,
  interval2: IInterval
): boolean => {
  if (
    timeToMinutes(interval1.initial) === timeToMinutes(interval2.initial) &&
    timeToMinutes(interval1.end) === timeToMinutes(interval2.end)
  ) {
    console.log("this interval aleardy exist");
    return false;
  }
  if (
    timeToMinutes(interval1.initial) > timeToMinutes(interval1.end) ||
    timeToMinutes(interval1.initial) === timeToMinutes(interval1.end)
  ) {
    return false;
  }
  if (
    // verify if a time is between other time
    timeToMinutes(interval1.initial) > timeToMinutes(interval2.initial) &&
    timeToMinutes(interval1.end) < timeToMinutes(interval2.end)
  ) {
    console.log("Interval 1 is inside the interval 2");
    return false;
  }

  if (
    timeToMinutes(interval1.initial) > timeToMinutes(interval2.initial) &&
    timeToMinutes(interval1.initial) < timeToMinutes(interval2.end)
  ) {
    console.log("Initial of interval 1 is inside other interval");
    return false;
  } else if (
    timeToMinutes(interval1.end) > timeToMinutes(interval2.initial) &&
    timeToMinutes(interval1.end) < timeToMinutes(interval2.end)
  ) {
    console.log("end of interval 1 is inside other interval");
    return false;
  }

  return true;
};

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

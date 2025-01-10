export function isBeforeToday(date: string) {
  const inputDate = new Date(date);

  // Get today's date and reset the time to midnight (00:00:00)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight to ignore time in comparison

  // Compare if the input date is before today
  return inputDate < today;
}

export const today = new Date();

export const frequencyOptions = [
  { value: "allDays", label: "All Days" },
  { value: "businessDays", label: "Business Days" },
  { value: "weekend", label: "Weekend" },
  { value: "oneDay", label: "One Day" },
  { value: "someDays", label: "Some Days" },
  { value: "specificDays", label: "Specific Days" },
];

export const difficultyOptions = [
  { value: "", label: "Difficulty" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

export const priorityOptions = [
  { value: "", label: "Priority" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

export const typeDates = {
  calendar: ["someDays", "oneDay"],
  onlyDays: ["specificDays"],
  noDays: ["weekend", "businessDays", "allDays"],
};

export const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

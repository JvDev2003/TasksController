export interface IDate {
  name: string;
  value: string[];
  addDate: (date: string) => void;
  removeDate: (index: number | string) => void;
  isCalendar: boolean;
}

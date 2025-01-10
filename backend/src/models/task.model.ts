import { Schema, model } from "mongoose";

const period = new Schema({
  initial: { type: String, required: true },
  end: { type: String, required: true },
});

const taskSchema = new Schema({
  name: { type: String, required: true },
  frequency: {
    type: String,
    required: true,
    enum: [
      "allDays",
      "businessDays",
      "weekend",
      "oneDay",
      "someDays",
      "specificDays",
    ],
  },
  days: { type: [String], required: false },
  time: { type: [period], required: true },
  reusable: { type: Boolean, required: true },
  difficulty: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  priority: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
});

export const TaskSchema = model("task", taskSchema);

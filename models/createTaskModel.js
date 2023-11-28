import { model, models, default as mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: { type: String },
    status: { type: String, default: "Pending" },
    notes: { type: String },
    moreInfo: { type: String },
  },
  { timestamps: true }
);

const TaskModel = models.Task || model("Task", taskSchema);

export default TaskModel;

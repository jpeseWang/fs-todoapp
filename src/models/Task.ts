import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    deadline: {
      type: Date,
      require: true,
    },
    completed: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Task || mongoose.model("Task", taskSchema);

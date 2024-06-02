import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
    },
    text: {
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

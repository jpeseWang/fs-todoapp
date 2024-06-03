import { NextResponse } from "next/server";
import Task from "@/models/Task";
import CommonUtil from "@/utils/commonUtils";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const updatedTask = await request.json();
  console.log("updatedTask", updatedTask)

  try {
    // Connect to the database
    await CommonUtil.connectDB();

    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true, runValidators: true });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse("Task has been updated", { status: 200 });
  } catch (err) {
    console.error("Database Error:", err); // Log the error for debugging
    return new NextResponse("Database Error", { status: 500 });
  }
};

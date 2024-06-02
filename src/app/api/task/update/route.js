import { NextResponse } from "next/server";
import Task from "@/models/Task";
import CommonUtil from "@/utils/commonUtils";

export const PUT = async (request, { params }) => {
  const { id } = params;
  const updatedTask = await request.json();

  try {
    await CommonUtil.connectDB();
    const task = await Task.findByIdAndUpdate(id, updatedTask, {
      new: true,
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    return new NextResponse("Task has been updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

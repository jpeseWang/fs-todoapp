import { NextResponse } from "next/server";
import Task from "@/models/Task";
import CommonUtil from "@/utils/commonUtils";

export const POST = async (request) => {
  const body = await request.json();
  const task = new Task(body);

  try {
    await CommonUtil.connectDB();
    await task.save();
    return new NextResponse("Task has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

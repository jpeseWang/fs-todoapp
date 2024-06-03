import { NextResponse } from "next/server";
import Task from "@/models/Task";
import CommonUtil from "@/utils/commonUtils";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await CommonUtil.connectDB();
    await Task.findByIdAndDelete(id);
    return new NextResponse("Task has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

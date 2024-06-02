import { NextResponse } from "next/server";
import Task from "@/models/Task";
import CommonUtil from "@/utils/commonUtils";

export const GET = async (request) => {
  try {
    await CommonUtil.connectDB();
    const tasks = await Task.find();
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

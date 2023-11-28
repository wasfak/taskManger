import db from "@/db";
import TaskModel from "@/models/createTaskModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await db.connectDb();
    const tasks = await TaskModel.find({ status: "Pending" });
    return NextResponse.json({ status: 200, tasks });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  } finally {
    await db.disconnectDb();
  }
};

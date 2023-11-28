import db from "@/db";
import TaskModel from "@/models/createTaskModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { title, description, moreInfo } = await req.json();

  try {
    await db.connectDb();
    const newTask = new TaskModel({
      name: title,
      notes: description,
      moreInfo,
    });

    await newTask.save();
    return NextResponse.json({ status: 200, data: newTask });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  } finally {
    await db.disconnectDb();
  }
};

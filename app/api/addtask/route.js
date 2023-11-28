import db from "@/db";
import TaskModel from "@/models/createTaskModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const { title, description, moreInfo } = body;

  await db.connectDb();
  const newTask = await TaskModel.create({
    name: title,
    notes: description,
    moreInfo,
  });
  await newTask.save();
  return NextResponse.json({ status: 200, data: newTask });
};

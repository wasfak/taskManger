import db from "@/db";
import TaskModel from "@/models/createTaskModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { id } = await req.json();
  const objectId = new ObjectId(id);

  try {
    await db.connectDb();
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: objectId },
      { status: "Finished" },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ status: 404, message: "Task not found" });
    }

    return NextResponse.json({ status: 200, updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  } finally {
    await db.disconnectDb();
  }
};

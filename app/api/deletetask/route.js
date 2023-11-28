import db from "@/db";
import TaskModel from "@/models/createTaskModel";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
const mongoose = require("mongoose");

export const POST = async (req) => {
  const body = await req.json();
  const { id } = body;
  const objectId = mongoose.isValidObjectId(id) ? new ObjectId(id) : id;

  await db.connectDb();

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: objectId },
      { status: "Finished" },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      // Handle case where task with the provided id is not found
      return NextResponse.json({ status: 404, message: "Task not found" });
    }

    return NextResponse.json({ status: 200, updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
};

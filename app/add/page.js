"use client";
import React, { useState } from "react";
import MainLayout from "../component/MainLayout";

import { useRouter } from "next/navigation";

export default function AddTask() {
  const router = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    moreInfo: "", // New field
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const baseURL =
      process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
    try {
      const response = await fetch(`${baseURL}/api/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      alert("Done");
      setNewTask({
        title: "",
        description: "",
        moreInfo: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto p-4">
        <form
          onSubmit={handleAddTask}
          className="max-w-md mx-auto bg-white p-8 border rounded shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-2"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="moreInfo"
              className="block text-sm font-semibold mb-2"
            >
              More Info:
            </label>
            <textarea
              id="moreInfo"
              name="moreInfo"
              value={newTask.moreInfo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Add more fields as needed */}
          <button
            type="submit"
            className="flex items-center justify-center p-4 bg-black text-white rounded-xl hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Task
          </button>
        </form>
      </div>
    </MainLayout>
  );
}

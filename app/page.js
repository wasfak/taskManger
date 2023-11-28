"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "./component/MainLayout";
import Tasks from "./component/Tasks";
import { useRouter } from "next/navigation";

export default function Home() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const updateCounters = (action) => {
    if (action === "increment") {
      setDoneTasks((prev) => prev + 1);
    } else if (action === "decrement") {
      setDoneTasks((prev) => prev - 1);
    }
  };
  const refreshData = () => {
    getData();
  };
  useEffect(() => {
    getData();
  }, [tasks]);
  const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
  const getData = async () => {
    const response = await fetch(`${baseURL}/api/tasks`, {
      method: "GET",
    });
    const data = await response.json();
    setTasks(data.tasks);
  };

  return (
    <MainLayout>
      <div className="text-center flex items-center justify-center gap-x-4 text-2xl font-bold">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {doneTasks}</p>
        <p>
          Done:
          {(
            (doneTasks < 0 ? doneTasks == 0 : doneTasks / tasks.length) * 100
          ).toFixed()}
          %
        </p>
      </div>

      <div className="flex items-center justify-center mt-6 flex-wrap gap-x-16 gap-y-10">
        {tasks &&
          tasks.map((task) => (
            <Tasks
              key={task._id}
              updateCounters={updateCounters}
              task={task}
              refreshData={refreshData}
            />
          ))}
      </div>
    </MainLayout>
  );
}

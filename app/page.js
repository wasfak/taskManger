"use client";
import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "./component/MainLayout";
import Tasks from "./component/Tasks";
import { useRouter } from "next/navigation";

export default function Home() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const refreshData = async () => {
      try {
        const response = await fetch(`/api/tasks`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    refreshData();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const updateCounters = (action) => {
    if (action === "increment") {
      setDoneTasks((prev) => prev + 1);
    } else if (action === "decrement") {
      setDoneTasks((prev) => prev - 1);
    }
  };

  // Check if tasks is undefined before accessing its properties
  const tasksLength = tasks ? tasks.length : 0;

  return (
    <MainLayout>
      <div className="text-center flex items-center justify-center gap-x-4 text-2xl font-bold">
        <p>Total Tasks: {tasksLength}</p>
        <p>Completed Tasks: {doneTasks}</p>
        <p>
          Done:
          {(tasksLength > 0
            ? doneTasks < 0
              ? doneTasks === 0
                ? 0
                : doneTasks
              : (doneTasks / tasksLength) * 100
            : 0
          ).toFixed()}
          %
        </p>
      </div>

      <div className="flex items-center justify-center mt-6 flex-wrap gap-x-16 gap-y-10">
        {tasks &&
          tasks.map((task) => (
            <Tasks key={task._id} updateCounters={updateCounters} task={task} />
          ))}
      </div>
    </MainLayout>
  );
}

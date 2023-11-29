"use client";
import React, { useState } from "react";
import MainLayout from "./component/MainLayout";
import Tasks from "./component/Tasks";

export default function Home() {
  const [tasksLength, setTasksLength] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [tasks, setTasks] = useState([]);

  const handelGetData = async () => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "GET",
      });
      const data = await response.json();

      setTasks(data.tasks);
      const tasksLength = data?.tasks.length;
      setTasksLength(tasksLength);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateCounters = (action) => {
    if (action === "increment") {
      setDoneTasks((prev) => prev + 1);
    } else if (action === "decrement") {
      setDoneTasks((prev) => prev - 1);
    }
  };

  return (
    <MainLayout>
      <button onClick={handelGetData}>Click</button>
      {tasksLength ? (
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
      ) : null}

      <div className="flex items-center justify-center mt-6 flex-wrap gap-x-16 gap-y-10">
        {tasks &&
          tasks.map((task) => (
            <Tasks key={task._id} updateCounters={updateCounters} task={task} />
          ))}
      </div>
    </MainLayout>
  );
}

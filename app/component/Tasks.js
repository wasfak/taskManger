"use client";

import DateFormate from "@/utils/time";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function Tasks({ updateCounters, task, refreshData }) {
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);

  const handleCheckboxClick = () => {
    setIsClicked1(!isClicked1);
    updateCounters(isClicked1 ? "decrement" : "increment");
  };

  const ccClicked = "line-through capitalize text-red-700";

  const handelComplete = async (id) => {
    const res = await fetch("/api/deletetask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const response = await res.json();
    if (response.status === 200) {
      refreshData();
    }
  };

  return (
    <div className="flex flex-col justify-between border rounded-3xl p-8 space-y-6 shadow-2xl">
      {/* Task 1 */}
      <div className="flex items-center justify-between">
        <h3 className={isClicked1 ? `${ccClicked}` : "capitalize"}>
          {task.name}
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="checkbox1"
            checked={isClicked1}
            onChange={handleCheckboxClick}
            className="h-4 w-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>

      {/* Task 2 */}
      <div className="flex items-center justify-between">
        <h3 className={isClicked2 ? `${ccClicked}` : "capitalize"}>
          {task.status}
        </h3>
        <div className="flex items-center"></div>
      </div>

      {/* Task 3 */}
      <div className="flex items-center justify-between">
        <div className="flex items-left justify-start w-[300px]">
          <h3 className={isClicked3 ? `${ccClicked}` : "capitalize"}>
            {task.notes}
          </h3>
        </div>
        <div className="flex items-center">
          {/*           <input
            type="checkbox"
            id="checkbox3"
            checked={isClicked3}
            onChange={() => {
              setIsClicked3(!isClicked3);
              updateCounters(isClicked3 ? "decrement" : "increment");
            }}
            className="h-4 w-4 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          /> */}
        </div>
      </div>

      <span>
        Place: <br /> {task.moreInfo}
      </span>
      <span>{DateFormate(task.createdAt)}</span>
      <button
        className="flex items-center justify-center p-4 bg-black text-white rounded-xl"
        onClick={() => handelComplete(task._id)}
      >
        Completed
      </button>
    </div>
  );
}

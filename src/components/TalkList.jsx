import React from "react";
import dayjs from "dayjs";

export default function TaskList({ tasks }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Tasks</h3>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <p className="font-medium text-gray-800">{task.name}</p>
            <p className="text-sm text-slate-600">
              Due: {dayjs(task.due).format("DD MMM YYYY")}
            </p>
            <p className="text-xs text-slate-500">Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

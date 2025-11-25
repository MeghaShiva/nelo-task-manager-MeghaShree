import React from "react";

export default function Filters({ setFilter }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-200 rounded">All</button>
      <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-200 rounded">Completed</button>
      <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-200 rounded">Pending</button>

      <div className="relative inline-flex">
        <button onClick={() => setFilter("priority:high")} className="px-3 py-1 bg-red-200 rounded">High</button>
        <button onClick={() => setFilter("priority:medium")} className="px-3 py-1 bg-yellow-100 rounded">Medium</button>
        <button onClick={() => setFilter("priority:low")} className="px-3 py-1 bg-green-100 rounded">Low</button>
      </div>
    </div>
  );
}

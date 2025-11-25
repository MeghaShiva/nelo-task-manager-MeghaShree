import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal";

function PriorityBadge({ priority }) {
  const cls =
    priority === "high"
      ? "bg-red-100 text-red-800"
      : priority === "medium"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";
  return <span className={`text-xs px-2 py-1 rounded ${cls}`}>{priority}</span>;
}

export default function TaskList({ tasks, onDelete, onToggle, onUpdate }) {
  const [editing, setEditing] = useState(null);

  if (!tasks?.length) {
    return <div className="text-sm text-gray-500">No tasks found</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white p-3 rounded shadow flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h4 className={`font-semibold ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.title}
              </h4>
              <PriorityBadge priority={task.priority} />
            </div>
            <div className="text-sm text-gray-600">{task.description}</div>
            <div className="text-xs text-gray-500 mt-1">Due: {task.dueDate || "No due date"}</div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <button
              onClick={() => onToggle(task.id)}
              className="px-2 py-1 border rounded text-sm"
            >
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>

            <div className="flex gap-2">
              <button onClick={() => setEditing(task)} className="px-2 py-1 border rounded text-sm">Edit</button>
              <button onClick={() => onDelete(task.id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
            </div>
          </div>

          {editing && editing.id === task.id && (
            <EditTaskModal
              task={editing}
              onClose={() => setEditing(null)}
              onSave={(updated) => { onUpdate(task.id, updated); setEditing(null); }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

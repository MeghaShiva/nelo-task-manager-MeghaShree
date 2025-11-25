import React, { useState } from "react";

export default function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  function save(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title required");
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow p-4 w-full max-w-md">
        <h3 className="font-semibold mb-3">Edit Task</h3>
        <form onSubmit={save} className="space-y-2">
          <input className="w-full p-2 border rounded" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <textarea className="w-full p-2 border rounded" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} />
          <div className="flex gap-2">
            <select className="p-2 border rounded flex-1" value={priority} onChange={(e)=>setPriority(e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <input type="date" className="p-2 border rounded" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
          </div>

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

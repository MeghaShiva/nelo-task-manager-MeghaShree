import React, { useState } from "react";

export default function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    });
    // clear form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-3">Add Task</h3>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex gap-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 border rounded flex-1"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-2 bg-indigo-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}

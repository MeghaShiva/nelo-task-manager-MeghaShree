import React, { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";

/**
 * Local storage key for tasks
 */
const STORAGE_KEY = "nelo_tasks_v1";

/**
 * Cron interval in milliseconds.
 * Keep 20 * 60 * 1000 (20 minutes) for real behavior.
 * For demo/recording you can temporarily set to 10000 (10s) then revert.
 */
const CRON_INTERVAL = 20 * 60 * 1000;

export default function App() {
  // session check
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("nelo_user")) || null;
    } catch {
      return null;
    }
  });

  // tasks state (persisted to localStorage)
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  // UI controls
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // persist tasks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // cron: check pending tasks and "send" mock emails
  useEffect(() => {
    function notifyPending() {
      const pending = tasks.filter((t) => !t.completed);
      if (!pending.length) return;
      // For demo: console log. In a real app you would call an API.
      console.log(
        `[MockEmail] ${new Date().toISOString()} - ${pending.length} pending tasks`
      );
      pending.forEach((t) =>
        console.log(` - ${t.title} (due: ${t.dueDate || "N/A"})`)
      );
    }

    // run immediately and then every CRON_INTERVAL
    notifyPending();
    const id = setInterval(notifyPending, CRON_INTERVAL);
    return () => clearInterval(id);
  }, [tasks]);

  // CRUD handlers
  function handleAdd(task) {
    const newTask = {
      id: Date.now(),
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",
      dueDate: task.dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((s) => [newTask, ...s]);
  }

  function handleDelete(id) {
    if (!confirm("Delete this task?")) return;
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  function handleToggle(id) {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function handleUpdate(id, updated) {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, ...updated } : t)));
  }

  // login / logout handlers
  function handleLogin(email) {
    const u = { email };
    sessionStorage.setItem("nelo_user", JSON.stringify(u));
    setUser(u);
  }

  function handleLogout() {
    sessionStorage.removeItem("nelo_user");
    setUser(null);
  }

  // filtered & searched results (elastic flow)
  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = [...tasks];

    // filter
    if (filter === "completed") list = list.filter((t) => t.completed);
    else if (filter === "pending") list = list.filter((t) => !t.completed);
    else if (filter.startsWith("priority:")) {
      const p = filter.split(":")[1];
      list = list.filter((t) => t.priority === p);
    }

    // search (elastic: title + description + priority)
    if (q) {
      list = list.filter((t) =>
        (t.title + " " + t.description + " " + t.priority)
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [tasks, filter, search]);

  // if not logged in show login
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AddTask onAdd={handleAdd} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
              <SearchBar setSearch={setSearch} />
              <Filters setFilter={setFilter} />
            </div>

            <TaskList
              tasks={results}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

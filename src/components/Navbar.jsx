import React from "react";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-indigo-600">NELO Task Manager</h1>
          <div className="text-xs text-gray-500">Signed in as {user?.email}</div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="px-3 py-1 border rounded text-sm hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

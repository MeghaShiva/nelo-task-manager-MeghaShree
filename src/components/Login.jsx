import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password required");
      return;
    }
    // simple session store
    if (onLogin) onLogin(email);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <label className="text-sm">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-indigo-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

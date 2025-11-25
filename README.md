# NELO Task Manager (Vite + React + Tailwind)

Features:
- Login (sessionStorage)
- Create, Read, Update, Delete tasks
- Mark Complete / Pending
- Filters (All, Completed, Pending, Priority)
- Debounced search (elastic-style)
- Tasks persisted in localStorage
- Mock email automation (cron) that checks pending tasks every 20 minutes (simulated)
- Tailwind UI

How to run:
1. `npm install`
2. `npm run dev`
3. Open the dev URL printed by Vite.

Note: For demo you may temporarily shorten the cron interval in `src/App.jsx` to e.g. 10000 (10s) to see repeated notifications during recording.

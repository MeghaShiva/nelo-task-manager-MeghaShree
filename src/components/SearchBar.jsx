import React, { useEffect, useState } from "react";

function useDebounce(value, delay = 400) {
  const [deb, setDeb] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDeb(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return deb;
}

export default function SearchBar({ setSearch }) {
  const [text, setText] = useState("");
  const debounced = useDebounce(text, 400);

  useEffect(() => {
    setSearch(debounced);
  }, [debounced, setSearch]);

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="w-full md:w-2/3 p-2 border rounded"
    />
  );
}

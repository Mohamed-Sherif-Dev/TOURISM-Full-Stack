import { useEffect, useState } from "react";

const DIFFICULTY = [
  { value: "", label: "All difficulties" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "difficult", label: "Difficult" },
];

const SORTS = [
  { value: "-createdAt", label: "Newest" },
  { value: "createdAt",  label: "Oldest" },
  { value: "-ratingsAverage", label: "Top rated" },
  { value: "price", label: "Price: Low → High" },
  { value: "-price", label: "Price: High → Low" },
];

const ToursFilterBar = ({ value, onChange }) => {
  const [localSearch, setLocalSearch] = useState(value.search || "");

  // debounce للـ search
  useEffect(() => {
    const t = setTimeout(() => onChange({ ...value, search: localSearch }), 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearch]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <input
        type="text"
        placeholder="Search tours…"
        className="h-10 w-64 rounded-md border px-3"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />

      {/* Difficulty */}
      <select
        className="h-10 rounded-md border px-2"
        value={value.difficulty || ""}
        onChange={(e) => onChange({ ...value, difficulty: e.target.value })}
      >
        {DIFFICULTY.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      {/* Sort */}
      <select
        className="h-10 rounded-md border px-2"
        value={value.sort || "-createdAt"}
        onChange={(e) => onChange({ ...value, sort: e.target.value })}
      >
        {SORTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <button
        onClick={() => onChange({ search: "", difficulty: "", sort: "-createdAt" })}
        className="h-10 rounded-md border px-3"
      >
        Reset
      </button>
    </div>
  );
};

export default ToursFilterBar;
import React from "react";

function eventColorClass(id) {
  const colors = [
    "bg-rose-300 text-rose-900",
    "bg-amber-300 text-amber-900",
    "bg-sky-300 text-sky-900",
    "bg-emerald-300 text-emerald-900",
  ];
  return colors[id % colors.length];
}

export default function DayCell({ day, isToday, events, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-2 h-full flex flex-col justify-start transition-all hover:shadow-md cursor-pointer bg-white ${
        isToday ? "ring-2 ring-green-400" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-700">
          {day.date()}
        </span>
        {isToday && (
          <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-md">
            Today
          </span>
        )}
      </div>
      <div className="mt-1 space-y-1 overflow-hidden">
  {events.map((ev) =>
    ev.type === "event" ? (
      <div
        key={`ev-${ev.id}`}
        className="text-[11px] px-2 py-1 rounded-md truncate bg-sky-200 text-sky-900"
      >
        {ev.time} • {ev.title}
      </div>
    ) : (
      <div
        key={`task-${ev.id}`}
        className="text-[11px] px-2 py-1 rounded-md truncate bg-purple-200 text-purple-900"
      >
        📝 {ev.name}
      </div>
    )
  )}
</div>


    </div>
  );
}

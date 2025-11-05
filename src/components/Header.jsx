import React from "react";

export default function Header({
  monthLabel,
  dateLabel,
  onPrev,
  onNext,
  today,
  jumpToToday,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-blue-700">{monthLabel}</h2>
        <p className="text-sm text-slate-500">{dateLabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={jumpToToday}
          className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-700 text-sm hover:bg-gray-300"
        >
          Today • {today.format("D MMM")}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            ‹
          </button>
          <button
            onClick={onNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

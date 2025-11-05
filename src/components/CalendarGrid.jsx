import React from "react";
import dayjs from "dayjs";
import DayCell from "./DayCell";

const toDateKey = (d) => dayjs(d).format("YYYY-MM-DD");

export default function CalendarGrid({ days, today, eventsByDate, onDateClick }) {
  const weekdayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="p-4 md:p-6">
      <div className="grid grid-cols-7 gap-2 text-xs text-gray-600 font-semibold">
        {weekdayNames.map((wd) => (
          <div key={wd} className="text-center uppercase tracking-wide">
            {wd}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-2 auto-rows-[120px]">
        {days.map((day) => {
          const key = toDateKey(day);
          const colStart = day.weekday() + 1;
          const events = eventsByDate[key] || [];
          return (
            <div key={key} style={{ gridColumnStart: colStart }}>
              <DayCell
                day={day}
                isToday={day.isSame(today, "day")}
                events={events}
                onClick={() => onDateClick(key)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

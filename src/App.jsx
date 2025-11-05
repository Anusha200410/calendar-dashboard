import React, { useState, useMemo } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import advancedFormat from "dayjs/plugin/advancedFormat";

import CalendarGrid from "./components/CalendarGrid";
// import TaskList from "./components/TaskList";
import Header from "./components/Header";
import EventModal from "./components/EventModal";
import eventsData from "./data/events.json";
import tasksData from "./data/tasks.json";
import { getEventsByDate, getSeasonColors } from "./utils/helpers";

dayjs.extend(isoWeek);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

export default function App() {
  const today = dayjs();
  const [visibleDate, setVisibleDate] = useState(dayjs().startOf("month"));
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("calendar");

  // const eventsByDate = useMemo(() => getEventsByDate(eventsData), []);
  const eventsByDate = useMemo(() => getEventsByDate(eventsData, tasksData), []);

  const days = useMemo(() => buildMonthGrid(visibleDate), [visibleDate]);
  const season = getSeasonColors(visibleDate.month());

  function buildMonthGrid(monthStart) {
    const start = monthStart.startOf("month");
    const end = monthStart.endOf("month");
    const days = [];
    let cursor = start;
    while (cursor.isBefore(end) || cursor.isSame(end, "day")) {
      days.push(cursor);
      cursor = cursor.add(1, "day");
    }
    return days;
  }

  function prevMonth() {
    setVisibleDate((d) => d.subtract(1, "month"));
  }

  function nextMonth() {
    setVisibleDate((d) => d.add(1, "month"));
  }

  function handleDateClick(dateKey) {
    const events = eventsByDate[dateKey] || [];
    setSelectedEvents(events);
    setShowModal(true);
  }

  return (
    <div
      className={`min-h-screen flex bg-gradient-to-br ${season.outer} text-gray-900 transition-all`}
    >
      {/* Sidebar */}
      <aside
        className="w-64 text-white p-6 flex flex-col justify-between shadow-xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
        }}
      >
        <div>
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <nav className="space-y-3">
            <div className="w-full text-left px-3 py-2 rounded-lg bg-white/10 opacity-60">
              🏠 Home
            </div>
            <button
              onClick={() => setView("calendar")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                view === "calendar"
                  ? "bg-white/25"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              🗓 Calendar
            </button>
            <button
              onClick={() => setView("tasks")}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                view === "tasks"
                  ? "bg-white/25"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              📋 Tasks
            </button>
            <div className="w-full text-left px-3 py-2 rounded-lg bg-white/10 opacity-60">
              ⚙️ Settings
            </div>
          </nav>
        </div>
        <div className="text-sm opacity-70 text-center">
          © 2025 MyCalendarApp
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-white/95 rounded-l-2xl">
        {view === "calendar" && (
          <>
            <Header
              monthLabel={visibleDate.format("MMMM YYYY")}
              dateLabel={today.format("dddd, D MMMM YYYY")}
              onPrev={prevMonth}
              onNext={nextMonth}
              today={today}
              jumpToToday={() => setVisibleDate(dayjs().startOf("month"))}
            />
            <div className="mt-6 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
              <CalendarGrid
                days={days}
                month={visibleDate}
                today={today}
                eventsByDate={eventsByDate}
                onDateClick={handleDateClick}
              />
            </div>
            {showModal && (
              <EventModal
                events={selectedEvents}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        )}
        {view === "tasks" && <TaskList tasks={tasksData} />}
      </main>
    </div>
  );
}
function TaskList({ tasks }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Tasks</h3>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            <p className="font-medium text-gray-800">{task.name}</p>
            <p className="text-sm text-slate-600">
              Due: {dayjs(task.due).format("DD MMM YYYY, h:mm A")}
            </p>
            <p className="text-xs text-slate-500">Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

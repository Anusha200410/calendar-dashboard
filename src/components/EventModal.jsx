import React from "react";

export default function EventModal({ events, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Event Details
        </h3>
        {events.length > 0 ? (
          <ul className="space-y-3">
            {events.map((ev) => (
              <li
                key={ev.id}
                className="border p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <p className="font-medium text-gray-800">{ev.title}</p>
                <p className="text-sm text-slate-600">{ev.description}</p>
                <p className="text-xs text-slate-500 mt-1">
                  🕒 {ev.time} | ⏱ {ev.durationMin} min
                </p>
                <p className="text-xs text-slate-500">📍 {ev.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500 text-sm">
            No events scheduled for this date.
          </p>
        )}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

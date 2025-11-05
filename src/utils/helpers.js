export function getEventsByDate(events, tasks) {
  const map = {};

  events.forEach((e) => {
    const key = e.date;
    if (!map[key]) map[key] = [];
    map[key].push({ ...e, type: "event" });
  });

  tasks.forEach((t) => {
    const key = t.due;
    if (!map[key]) map[key] = [];
    map[key].push({ ...t, type: "task" });
  });

  return map;
}


export function getSeasonColors(month) {
  if ([11, 0, 1].includes(month))
    return { outer: "from-sky-700 via-blue-600 to-cyan-500" }; // Winter
  if ([2, 3, 4].includes(month))
    return { outer: "from-green-700 via-emerald-600 to-lime-500" }; // Spring
  if ([5, 6, 7].includes(month))
    return { outer: "from-orange-600 via-yellow-500 to-red-500" }; // Summer
  return { outer: "from-amber-700 via-orange-600 to-yellow-500" }; // Autumn
}

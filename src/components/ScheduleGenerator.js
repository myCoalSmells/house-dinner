const ScheduleGenerator = {
  generate: (participants) => {
    const days = ["M", "T", "W", "R"];
    const chosenDays = selectBestDays(participants, days);
    const generatedSchedule = generateTenWeekSchedule(participants, chosenDays);
    return { chosenDays, generatedSchedule };
  },
};

function selectBestDays(participants, days) {
  // Count availability for each day
  const availability = days.reduce((acc, day) => {
    acc[day] = participants.filter(
      (p) => p.cookDays.includes(day) || p.cleanDays.includes(day)
    ).length;
    return acc;
  }, {});

  // Sort days by availability and select the top two
  return Object.entries(availability)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([day]) => day);
}

function generateTenWeekSchedule(participants, chosenDays) {
  const schedule = [];
  for (let week = 1; week <= 10; week++) {
    const weekSchedule = {
      weekNumber: week,
      dinners: chosenDays.map((day) => ({
        day,
        headChef: selectParticipant(participants, "cook", day),
        assistantChef: selectParticipant(participants, "cook", day),
        cleaners: [
          selectParticipant(participants, "clean", day),
          selectParticipant(participants, "clean", day),
        ],
      })),
    };
    schedule.push(weekSchedule);
  }
  return schedule;
}

function selectParticipant(participants, role, day) {
  const availableParticipants = participants.filter((p) =>
    role === "cook" ? p.cookDays.includes(day) : p.cleanDays.includes(day)
  );
  return availableParticipants[
    Math.floor(Math.random() * availableParticipants.length)
  ].name;
}

export default ScheduleGenerator;

const ScheduleGenerator = {
  generate: (participants, selectedDays = []) => {
    const days = ["M", "T", "W", "R"];
    const { suggestedDays, chosenDays } = suggestAndSelectDays(
      participants,
      days,
      selectedDays
    );
    const generatedSchedule = generateTenWeekSchedule(participants, chosenDays);
    const tally = generateTally(generatedSchedule);
    return { suggestedDays, chosenDays, generatedSchedule, tally };
  },
};

function selectBestDays(participants, days) {
  const availability = days.reduce((acc, day) => {
    acc[day] = participants.filter(
      (p) => p.cookDays.includes(day) || p.cleanDays.includes(day)
    ).length;
    return acc;
  }, {});

  return Object.entries(availability)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([day]) => day);
}

function suggestAndSelectDays(participants, days, selectedDays) {
  const suggestedDays = selectBestDays(participants, days);
  return {
    suggestedDays,
    chosenDays: selectedDays.length > 0 ? selectedDays : suggestedDays,
  };
}

function generateTenWeekSchedule(participants, chosenDays) {
  const schedule = [];
  const taskCounts = participants.reduce(
    (acc, p) => ({ ...acc, [p.name]: { cook: 0, clean: 0 } }),
    {}
  );

  const totalDinners = 10 * chosenDays.length;
  const regularParticipants = participants.filter((p) => p.name !== "Cal");
  const targetTasksPerPerson =
    (totalDinners * 4) / (regularParticipants.length + 0.5); // Accounting for Cal's half participation

  // Generate all possible dinner slots for Cal
  const calDinnerSlots = [];
  for (let week = 1; week <= 10; week++) {
    if (chosenDays.includes("W")) {
      calDinnerSlots.push({ week, day: "W" });
    }
  }

  // Randomly select 5 dinner slots for Cal
  const calTargetDinners = 5;
  const selectedCalDinnerSlots = new Set(
    calDinnerSlots
      .sort(() => 0.5 - Math.random())
      .slice(0, calTargetDinners)
      .map((slot) => JSON.stringify(slot))
  );

  for (let week = 1; week <= 10; week++) {
    const weekSchedule = {
      weekNumber: week,
      dinners: chosenDays.map((day) => {
        const dinner = { day };
        const isCalAvailable =
          day === "W" &&
          selectedCalDinnerSlots.has(JSON.stringify({ week, day }));
        const availableCooks = participants.filter((p) =>
          p.name === "Cal" ? isCalAvailable : p.cookDays.includes(day)
        );
        const availableCleaners = participants.filter((p) =>
          p.name === "Cal" ? isCalAvailable : p.cleanDays.includes(day)
        );

        const selectedCooks = [];
        for (let i = 0; i < 2; i++) {
          const cook = selectParticipant(
            availableCooks.filter((p) => !selectedCooks.includes(p.name)),
            taskCounts,
            "cook",
            targetTasksPerPerson
          );
          selectedCooks.push(cook);
        }

        dinner.headChef = selectedCooks[0];
        dinner.assistantChef = selectedCooks[1];

        const availableCleanersWithoutCooks = availableCleaners.filter(
          (p) => !selectedCooks.includes(p.name)
        );

        dinner.cleaners = [];
        for (let i = 0; i < 2; i++) {
          const cleaner = selectParticipant(
            availableCleanersWithoutCooks.filter(
              (p) => !dinner.cleaners.includes(p.name)
            ),
            taskCounts,
            "clean",
            targetTasksPerPerson
          );
          dinner.cleaners.push(cleaner);
        }

        return dinner;
      }),
    };
    schedule.push(weekSchedule);
  }

  return schedule;
}

function selectParticipant(
  availableParticipants,
  taskCounts,
  task,
  targetTasksPerPerson
) {
  if (availableParticipants.length === 0) {
    throw new Error(`Not enough participants available for ${task} task`);
  }

  const sortedParticipants = availableParticipants.sort((a, b) => {
    const aTotalTasks = taskCounts[a.name].cook + taskCounts[a.name].clean;
    const bTotalTasks = taskCounts[b.name].cook + taskCounts[b.name].clean;

    // Special handling for Cal
    const aTarget = a.name === "Cal" ? 5 : targetTasksPerPerson;
    const bTarget = b.name === "Cal" ? 5 : targetTasksPerPerson;

    const aDiff = aTotalTasks - aTarget;
    const bDiff = bTotalTasks - bTarget;

    if (aDiff !== bDiff) {
      return aDiff - bDiff;
    }
    return taskCounts[a.name][task] - taskCounts[b.name][task];
  });

  const selected = sortedParticipants[0].name;
  taskCounts[selected][task]++;
  return selected;
}

function generateTally(schedule) {
  const tally = {};

  schedule.forEach((week) => {
    week.dinners.forEach((dinner) => {
      updateTally(tally, dinner.headChef, "cook");
      updateTally(tally, dinner.assistantChef, "cook");
      dinner.cleaners.forEach((cleaner) =>
        updateTally(tally, cleaner, "clean")
      );
    });
  });

  return tally;
}

function updateTally(tally, name, task) {
  if (!tally[name]) {
    tally[name] = { cook: 0, clean: 0 };
  }
  tally[name][task]++;
}

export default ScheduleGenerator;

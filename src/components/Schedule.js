import React from "react";

function Schedule({ schedule }) {
  if (schedule.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Generated Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Day</th>
            <th>Head Chef</th>
            <th>Assistant Chef</th>
            <th>Cleaners</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((week) =>
            week.dinners.map((dinner, index) => (
              <tr key={`${week.weekNumber}-${index}`}>
                <td>{week.weekNumber}</td>
                <td>{dinner.day}</td>
                <td>{dinner.headChef}</td>
                <td>{dinner.assistantChef}</td>
                <td>{dinner.cleaners.join(", ")}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Schedule;

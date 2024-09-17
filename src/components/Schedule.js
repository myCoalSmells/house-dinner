import React from "react";

function Schedule({ schedule }) {
  return (
    <div>
      <h2>Generated Schedule</h2>
      {schedule.map((week, index) => (
        <div key={index}>
          <h3>Week {week.weekNumber}</h3>
          {week.dinners.map((dinner, dinnerIndex) => (
            <div key={dinnerIndex}>
              <p>Date: {dinner.date}</p>
              <p>Head Chef: {dinner.headChef}</p>
              <p>Assistant Chef: {dinner.assistantChef}</p>
              <p>Cleaning: {dinner.cleaning.join(", ")}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Schedule;

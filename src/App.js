import React, { useState } from "react";
import "./App.css";
import ParticipantForm from "./components/ParticipantForm";
import ScheduleGenerator from "./components/ScheduleGenerator";
import Schedule from "./components/Schedule";
import ParticipantList from "./components/ParticipantList";
import Tally from "./components/Tally";

function App() {
  const [participants, setParticipants] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [tally, setTally] = useState({});
  const [suggestedDays, setSuggestedDays] = useState([]);
  const [chosenDays, setChosenDays] = useState([]);

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  const generateSchedule = () => {
    try {
      const { suggestedDays, generatedSchedule, tally } =
        ScheduleGenerator.generate(participants, chosenDays);
      setSuggestedDays(suggestedDays);
      setSchedule(generatedSchedule);
      setTally(tally);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDaySelection = (day) => {
    setChosenDays((prevDays) => {
      if (prevDays.includes(day)) {
        return prevDays.filter((d) => d !== day);
      } else {
        return [...prevDays, day];
      }
    });
  };

  return (
    <div className="App">
      <h1>House Dinner Schedule</h1>
      <ParticipantForm onAddParticipant={addParticipant} />
      <ParticipantList participants={participants} />
      <div>
        <h3>Select Dinner Days:</h3>
        {["M", "T", "W", "R"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              checked={chosenDays.includes(day)}
              onChange={() => handleDaySelection(day)}
            />
            {day}
          </label>
        ))}
      </div>
      <button onClick={generateSchedule} disabled={participants.length === 0}>
        Generate Schedule
      </button>
      {suggestedDays.length > 0 && (
        <p>Suggested days for dinner: {suggestedDays.join(", ")}</p>
      )}
      {chosenDays.length > 0 && (
        <p>Selected days for dinner: {chosenDays.join(", ")}</p>
      )}
      <Schedule schedule={schedule} />
      <Tally tally={tally} />
    </div>
  );
}

export default App;

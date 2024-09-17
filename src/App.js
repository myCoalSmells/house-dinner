import React, { useState } from "react";
import "./App.css";
import ParticipantForm from "./components/ParticipantForm";
import ScheduleGenerator from "./components/ScheduleGenerator";
import Schedule from "./components/Schedule";
import ParticipantList from "./components/ParticipantList";

function App() {
  const [participants, setParticipants] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  const generateSchedule = () => {
    const { chosenDays, generatedSchedule } =
      ScheduleGenerator.generate(participants);
    setSelectedDays(chosenDays);
    setSchedule(generatedSchedule);
  };

  return (
    <div className="App">
      <h1>House Dinner Schedule</h1>
      <ParticipantForm onAddParticipant={addParticipant} />
      <ParticipantList participants={participants} />
      <button onClick={generateSchedule} disabled={participants.length === 0}>
        Generate Schedule
      </button>
      {selectedDays.length > 0 && (
        <p>Selected days for dinner: {selectedDays.join(", ")}</p>
      )}
      <Schedule schedule={schedule} />
    </div>
  );
}

export default App;

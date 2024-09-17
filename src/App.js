import React, { useState } from "react";
import "./App.css";
import ParticipantForm from "./components/ParticipantForm";
import ScheduleGenerator from "./components/ScheduleGenerator";
import Schedule from "./components/Schedule";

function App() {
  const [participants, setParticipants] = useState([]);
  const [schedule, setSchedule] = useState([]);

  const addParticipant = (participant) => {
    setParticipants([...participants, participant]);
  };

  const generateSchedule = () => {
    const newSchedule = ScheduleGenerator.generate(participants);
    setSchedule(newSchedule);
  };

  return (
    <div className="App">
      <h1>House Dinner Schedule</h1>
      <ParticipantForm onAddParticipant={addParticipant} />
      <button onClick={generateSchedule}>Generate Schedule</button>
      <Schedule schedule={schedule} />
      <div>
        <h2>Participants</h2>
        {participants.map((participant, index) => (
          <div key={index}>
            <p>{participant.name}</p>
            <p>Cook on: {participant.cookDays.join(", ")}</p>
            <p>Clean on: {participant.cleanDays.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

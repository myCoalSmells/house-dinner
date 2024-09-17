import React, { useState } from "react";

function ParticipantForm({ onAddParticipant }) {
  const [name, setName] = useState("");
  const [cookDays, setCookDays] = useState({
    M: false,
    T: false,
    W: false,
    R: false,
  });
  const [cleanDays, setCleanDays] = useState({
    M: false,
    T: false,
    W: false,
    R: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddParticipant({
      name,
      cookDays: Object.keys(cookDays).filter((day) => cookDays[day]),
      cleanDays: Object.keys(cleanDays).filter((day) => cleanDays[day]),
    });
    setName("");
    setCookDays({ M: false, T: false, W: false, R: false });
    setCleanDays({ M: false, T: false, W: false, R: false });
  };

  const handleCookDayChange = (day) => {
    setCookDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleCleanDayChange = (day) => {
    setCleanDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <div>
        <p>Cook on:</p>
        {Object.keys(cookDays).map((day) => (
          <label key={`cook-${day}`}>
            <input
              type="checkbox"
              checked={cookDays[day]}
              onChange={() => handleCookDayChange(day)}
            />
            {day}
          </label>
        ))}
      </div>
      <div>
        <p>Clean on:</p>
        {Object.keys(cleanDays).map((day) => (
          <label key={`clean-${day}`}>
            <input
              type="checkbox"
              checked={cleanDays[day]}
              onChange={() => handleCleanDayChange(day)}
            />
            {day}
          </label>
        ))}
      </div>
      <button type="submit">Add Participant</button>
    </form>
  );
}

export default ParticipantForm;

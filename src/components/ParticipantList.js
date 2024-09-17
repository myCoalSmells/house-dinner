import React from "react";

function ParticipantList({ participants }) {
  if (participants.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Participants</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cook Days</th>
            <th>Clean Days</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{participant.cookDays.join(", ")}</td>
              <td>{participant.cleanDays.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantList;

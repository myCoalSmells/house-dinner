import React from "react";

function Tally({ tally }) {
  if (Object.keys(tally).length === 0) {
    return null;
  }

  return (
    <div>
      <h2>Chore Tally</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cook Count</th>
            <th>Clean Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tally).map(([name, counts]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{counts.cook}</td>
              <td>{counts.clean}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tally;

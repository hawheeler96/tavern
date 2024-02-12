import React, { useEffect, useState } from "react";

function Parties() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const response = await fetch("/api/parties");
        if (response.ok) {
          const data = await response.json();
          setParties(data);
        } else {
          console.error("Failed to fetch parties");
        }
      } catch (error) {
        console.error("Error fetching parties:", error);
      }
    };
    fetchParty();
  }, []);

  return (
    <div>
      <h3>Parties</h3>
      {parties.map((party) => (
        <div key={party.id}>
          <h4>{party.name}</h4>
          <p>{party.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Parties
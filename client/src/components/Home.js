import React, { useState, useEffect } from "react";

function Home() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
      const fetchCharacter = async () => {
          try{
              const response = await fetch("/characters");
              if (response.ok) {
                const data = await response.json();
                setCharacters(data);
              } else {
                console.error('Failed to fetch characters');
              }
          } catch (error) {
            console.error("Error fetching characters:", error)
          }
      }
      fetchCharacter();
  }, []);

  return (
    <div>
        <br />
      {characters.map((character, index) => (
        <div key={index}>
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
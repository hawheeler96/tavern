import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./CharacterSheet"

function Home({characters, setCharacters}) {
//   const [characters, setCharacters] = useState([]);
//   useEffect(() => {
//       const fetchCharacter = async () => {
//           try{
//               const response = await fetch("/characters");
//               if (response.ok) {
//                 const data = await response.json();
//                 setCharacters(data);
//               } else {
//                 console.error('Failed to fetch characters');
//               }
//           } catch (error) {
//             console.error("Error fetching characters:", error)
//           }
//       }
//       fetchCharacter();
//   }, []);

  return (
    <div>
      <br />
      {characters.map((character, index) => (
        <div key={index}>
          <nav>
            <h3 class="flex justify-center items-center text-xl text-white font-raleway">
              <Link to={`/character-sheet/${character.id}`}>
                {character.name}
              </Link>
            </h3>
          </nav>
        </div>
      ))}
    </div>
  );
}

export default Home;
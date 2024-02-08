import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./CharacterSheet";

function Home({ characters, user }) {
  const filteredCharacters = characters.filter(
    (character) => character.user_id === user.id
  );

  return (
    <div>
      <br />
      {filteredCharacters.map((character, index) => (
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

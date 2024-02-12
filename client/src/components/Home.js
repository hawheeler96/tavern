import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./CharacterSheet";
import MoreButton from "./MoreButton";

function Home({ characters, user }) {
  const [currentCharacters, setCurrentCharacters] = useState(0);
  const charNum = 4;

  const filteredCharacters = characters.filter(
    (character) => character.user_id === user.id
  );

  function scrollBeltForward() {
    setCurrentCharacters(currentCharacters + charNum);
  }

  function scrollBeltBackward() {
    if (currentCharacters >0) {
      setCurrentCharacters(currentCharacters - charNum);
    }
  }

  return (
    <div className="flex flex-wrap justify-center">
      <button
        onClick={scrollBeltBackward}
        class="text-5xl text-white flex flex-wrap align-middle py-16"
      >
        ❮
      </button>
      {filteredCharacters
        .slice(currentCharacters, charNum + currentCharacters)
        .map((character, index) => (
          <div key={index} className="w-1/6 p-4 flex flex-col items-center">
            <nav className="flex flex-col items-center">
              <div className="mb-2">
                <img
                  src="/images/tavern_avatar_img.png"
                  alt="Silhouette of an androgenous figure with pointed ears"
                  className="rounded-full w-40 h-40"
                />
              </div>
              <div className="text-center">
                {" "}
                {/* Centering text */}
                <h3 className="text-xl text-white font-raleway">
                  <Link to={`/character-sheet/${character.id}`}>
                    {character.name}
                  </Link>
                </h3>
              </div>
            </nav>
          </div>
        ))}
      {/* <MoreButton handleClick = {scrollBelt} /> */}
      <button
        onClick={scrollBeltForward}
        className="text-5xl text-white flex flex-wrap align-middle py-16"
      >
        ❯
      </button>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ViewCharacters({ characters, setCharacters, user, Capitalize }) {
  const filteredCharacters = characters.filter(
    (character) => character.user_id === user.id
  );
  return (
    <div className="flex flex-row justify-center">
      <div class="flex flex-row gap-3">
        <br />
        {filteredCharacters.map((character, index) => (
          <div>
            <nav>
              <Link to={`/character-sheet/${character.id}`}>
                <div
                  key={index}
                  class="text-white font-raleway p-4 w-60 h-80 rounded-md bg-soft-blue shadow-lg hover:shadow-inner hover:shadow-slate-950 hover:bg-slate-grey"
                >
                  <h3 class="flex justify-center items-center text-xl my-5">
                    {character.name}
                  </h3>
                  <div className="flex">
                    <img
                      src="/images/tavern_avatar_img.png"
                      alt="Silhouette of an androgenous figure with pointed ears"
                      className="w-40 h-40 flex justify-center items-center m-auto"
                    />
                  </div>
                  {character.dnd_class_level && (
                    <p class="flex justify-center items-center align-bottom text-xl mt-3 my-3">
                      Level {character.dnd_class_level}{" "}
                      {Capitalize(character.dnd_class)}
                    </p>
                  )}
                </div>
              </Link>
            </nav>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewCharacters;

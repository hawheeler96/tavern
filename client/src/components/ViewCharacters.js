import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function ViewCharacters({characters, setCharacters, user, Capitalize}) {
    const filteredCharacters = characters.filter(
      (character) => character.user_id === user.id
    );

  return (
    <div class="grid grid-cols-auto gap-4 place-content-center">
      <br />
      {filteredCharacters.map((character, index) => (
        <div>
          <nav>
            <Link to={`/character-sheet/${character.id}`}>
              <div
                key={index}
                class="text-white font-raleway p-4 w-60 h-80 bg-soft-blue shadow-lg hover:shadow-inner hover:shadow-slate-950 hover:bg-slate-grey"
              >
                <h3 class="flex justify-center items-center text-xl my-5">
                  {character.name}
                </h3>
                {character.dnd_class_level && (
                  <p class="flex justify-center items-center align-bottom text-xl mt-auto my-3">
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
  );
}

export default ViewCharacters;
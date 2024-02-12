import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const calculateModifier = (score) => {
  if (score === 1) {
    return -5;
  } else if (score >= 2 && score <= 3) {
    return -4;
  } else if (score >= 4 && score <= 5) {
    return -3;
  } else if (score >= 6 && score <= 7) {
    return -2;
  } else if (score >= 8 && score <= 9) {
    return -1;
  } else if (score >= 10 && score <= 11) {
    return 0;
  } else if (score >= 12 && score <= 13) {
    return 1;
  } else if (score >= 14 && score <= 15) {
    return 2;
  } else if (score >= 16 && score <= 17) {
    return 3;
  } else if (score >= 18 && score <= 19) {
    return 4;
  } else if (score === 20) {
    return 5;
  } else {
    return 0;
  }
};

const calculateProficiency = (level) => {
  if (level >= 1 && level <= 4) {
    return 2;
  } else if (level >= 5 && level <= 8) {
    return 3;
  } else if (level >= 9 && level <= 12) {
    return 4;
  } else if (level >= 13 && level <= 16) {
    return 5;
  } else if (level >= 17 && level <= 20) {
    return 6;
  } else {
    return 0;
  }
};

function EditCharacter({
  user,
  characters,
  setCharacters,
  Capitalize,
  onCharacterEdit,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    name: "",
    dnd_class: "",
    level: 1, // Default level set to 1
    hp: 0, // Default hp set to 0, adjust this based on your application logic
  });
  const prof_mod = calculateProficiency(character.level);

  let str_mod;
  if (character.abilityscores) {
    str_mod = calculateModifier(character.abilityscores.str_score);
    // const dex_mod = calculateModifier(dex_score);
    // const con_mod = calculateModifier(con_score);
    // const int_mod = calculateModifier(int_score);
    // const wis_mod = calculateModifier(wis_score);
    // const cha_mod = calculateModifier(cha_score);
  }
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/characters/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data === "object") {
            setCharacter(data);
          } else {
            console.error("Invalid character data:", data);
          }
        } else {
          console.error("Failed to fetch character");
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleEditCharacter = async () => {
    try {
      const updatedCharacter = {
        name: character.name,
        dnd_class: character.dnd_class,
        level: character.level,
        hp: character.hp,
      };

      const response = await fetch(`/characters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCharacter),
      });

      const responseData = await response.json();
      if (response.ok) {
        onCharacterEdit(responseData);
        if (character.abilityscores && character.abilityscores.id) {
          handleEditAbscores(character.abilityscores.id);
        } else {
          console.error("Ability scores ID is not available.");
        }
      } else {
        console.error("Failed to update character", responseData);
      }
    } catch (error) {
      console.error("Error updating character:", error);
    }
  };

  const handleEditAbscores = async (abscore_id) => {
    try {
      const updatedAbscores = {
        str_score: character.abilityscores.str_score,
        str_mod: str_mod,
      };

      const response = await fetch(`/ability-scores/${abscore_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAbscores),
      });

      const responseData = await response.json();
      if (response.ok) {
        onCharacterEdit(responseData);
      } else {
        console.error("Failed to update abilityscores:", responseData);
      }
    } catch (error) {
      console.error("Error updating abilityscores:", error);
    }
  };

//   const plusOrMinus = (num) => {
//     if (0 <= num) {
//       return `+${num}`;
//     } else {
//       return `${num}`;
//     }
//   };

  return (
    <div>
      <h3>Name</h3>
      <input
        type="text"
        value={character.name}
        onChange={(e) => {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            name: e.target.value,
          }));
        }}
      />
      <h3>Class {`(in lower case)`}</h3>
      <input
        type="text"
        value={character.dnd_class}
        onChange={(e) => {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            dnd_class: e.target.value,
          }));
          console.log(e.target.value);
          console.log(`class: ${character.dnd_class}`);
        }}
      />
      <h3>Level</h3>
      <input
        type="number"
        value={character.level}
        onChange={(e) => {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            level: e.target.value,
          }));
          console.log(e.target.value);
        }}
      />
      {/* {character.subclasses && <p>{character.subclasses}</p>} */}
      <h3>HP</h3>
      <input
        type="number"
        value={character.hp}
        onChange={(e) => {
          setCharacter((prevCharacter) => ({
            ...prevCharacter,
            hp: e.target.value,
          }));
          console.log(e.target.value);
          console.log(character.hp);
        }}
      />
      <div>
        <h4>Ability Scores</h4>
        {character.abilityscores && (
          <>
            <h3>Strength</h3>
            <input
              type="number"
              value={character.abilityscores.str_score}
              onChange={(e) => {
                const strScore = parseInt(e.target.value);
                setCharacter((prevCharacter) => ({
                  ...prevCharacter,
                  abilityscores: {
                    ...prevCharacter.abilityscores,
                    str_score: strScore,
                  },
                }));
                console.log(e.target.value);
                console.log(
                  `mod: ${str_mod}`
                );
              }}
            />
            <p>Strength mod: {character.abilityscores.str_mod}</p>
            <p>Dexterity {character.abilityscores.dex_score}</p>
            <p>Constitution {character.abilityscores.con_score}</p>
            <p>Intelligence {character.abilityscores.int_score}</p>
            <p>Wisdom {character.abilityscores.wis_score}</p>
            <p>Charisma {character.abilityscores.cha_score}</p>
          </>
        )}
      </div>
      <div>
        <h4>Skills</h4>
        {character.skills && (
          <>
            <p>Acrobatics {character.skills.acrobatics}</p>
            <p>Animal Handling {character.skills.animal_handling}</p>
            <p>Arcana {character.skills.arcana}</p>
            <p>Athletics {character.skills.athletics}</p>
            <p>Deception {character.skills.deception}</p>
            <p>History {character.skills.history}</p>
            <p>Insight {character.skills.insight}</p>
            <p>Intimidation {character.skills.intimidation}</p>
            <p>Investigation {character.skills.investigation}</p>
            <p>Medicine {character.skills.medicine}</p>
            <p>Nature {character.skills.nature}</p>
            <p>Perception {character.skills.perception}</p>
            <p>Performance {character.skills.performance}</p>
            <p>Persuasion {character.skills.persuasion}</p>
            <p>Religion {character.skills.religion}</p>
            <p>Sleight of Hand {character.skills.sleight_of_hand}</p>
            <p>Stealth {character.skills.stealth}</p>
            <p>Survival {character.skills.survival}</p>
          </>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            handleEditCharacter();
          }}
        >
          Edit Character
        </button>
      </div>
    </div>
  );
}

export default EditCharacter;

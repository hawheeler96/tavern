import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function CharacterSheet({ Capitalize, setCharacters }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`/characters/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCharacter(data);
        } else {
          console.error("Failed to fetch character");
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };
    fetchCharacter();
  }, [id]);

  const plusOrMinus = (num) => {
    if (0 <= num) {
      return `+${num}`;
    } else {
      return `${num}`;
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this character? This action cannot be reversed."
    );
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(`/characters/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character.id !== id)
        );
        navigate("/all-characters");
      } else {
        console.error("Could not delete character");
      }
    } catch (error) {
      console.error("Could not delete task:", error);
    }
  };

  return (
    <div>
      <h3>{character.name}</h3>
      <p>{Capitalize(character.dnd_class)}</p>
      {character.dnd_class_level && <p>{character.dnd_class_level}</p>}
      {/* {character.subclasses && <p>{character.subclasses}</p>} */}
      <p>HP {character.hp}</p>
      <div>
        <h4>Ability Scores</h4>
        {character.abilityscores && (
          <>
            <p>Strength {character.abilityscores.str_score}</p>
            <p>{plusOrMinus(character.abilityscores.str_mod)}</p>
            <p>Dexterity {character.abilityscores.dex_score}</p>
            <p>{plusOrMinus(character.abilityscores.dex_mod)}</p>
            <p>Constitution {character.abilityscores.con_score}</p>
            <p>{plusOrMinus(character.abilityscores.con_mod)}</p>
            <p>Intelligence {character.abilityscores.int_score}</p>
            <p>{plusOrMinus(character.abilityscores.int_mod)}</p>
            <p>Wisdom {character.abilityscores.wis_score}</p>
            <p>{plusOrMinus(character.abilityscores.wis_mod)}</p>
            <p>Charisma {character.abilityscores.cha_score}</p>
            <p>{plusOrMinus(character.abilityscores.cha_mod)}</p>
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
      <div class="flex justify-center items-center align-bottom bg-white text-soft-blue hover:bg-soft-gold">
        <button onClick={() => handleDelete(character.id)}>Delete Character</button>
      </div>
      <div>
        <Link to={`/character-sheet/${character.id}/edit`}>Edit Character</Link>
      </div>
    </div>
  );
}

export default CharacterSheet;

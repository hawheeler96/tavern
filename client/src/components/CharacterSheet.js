import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

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

function CharacterSheet({ Capitalize, setCharacters }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({ proficienciesArr: [] });
   const prof_mod = calculateProficiency(character.level);
   const str_mod = calculateModifier(character.abilityscores?.str_score);
   const dex_mod = calculateModifier(character.abilityscores?.dex_score);
   const con_mod = calculateModifier(character.abilityscores?.con_score);
   const int_mod = calculateModifier(character.abilityscores?.int_score);
   const wis_mod = calculateModifier(character.abilityscores?.wis_score);
   const cha_mod = calculateModifier(character.abilityscores?.cha_score);
   const proficienciesArr = character.proficienciesArr

   console.log(proficienciesArr)

   const plusOrMinus = (num) => {
     if (0 <= num) {
       return `+${num}`;
     } else {
       return `${num}`;
     }
   };
   

   const calculateStrSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficienciesArr.includes(proficiencyString)) {
       return plusOrMinus(str_mod + prof_mod);
     } else {
       return str_mod;
     }
   };

   const calculateDexSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficienciesArr.includes(proficiencyString)) {
       return plusOrMinus(dex_mod + prof_mod);
     } else {
       return plusOrMinus(dex_mod);
     }
   };

   const calculateIntSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficienciesArr.includes(proficiencyString)) {
       return plusOrMinus(int_mod + prof_mod);
     } else {
       return plusOrMinus(int_mod);
     }
   };

   const calculateWisSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficienciesArr.includes(proficiencyString)) {
       return plusOrMinus(wis_mod + prof_mod);
     } else {
       return plusOrMinus(wis_mod);
     }
   };

   const calculateChaSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficienciesArr.includes(proficiencyString)) {
       return plusOrMinus(cha_mod + prof_mod);
     } else {
       return plusOrMinus(cha_mod);
     }
   };

    const athletics = calculateStrSkillScore("athletics");
    const acrobatics = calculateDexSkillScore("acrobatics");
    const sleight_of_hand = calculateDexSkillScore("sleight_of_hand");
    const stealth = calculateDexSkillScore("stealth");
    const arcana = calculateIntSkillScore("arcana");
    const history = calculateIntSkillScore("history");
    const investigation = calculateIntSkillScore("investigation");
    const nature = calculateIntSkillScore("nature");
    const religion = calculateIntSkillScore("religion");
    const animal_handling = calculateWisSkillScore("animal_handling");
    const insight = calculateWisSkillScore("insight");
    const medicine = calculateWisSkillScore("medicine");
    const perception = calculateWisSkillScore("perception");
    const survival = calculateWisSkillScore("survival");
    const deception = calculateChaSkillScore("deception");
    const intimidation = calculateChaSkillScore("intimidation");
    const performance = calculateChaSkillScore("performance");
    const persuasion = calculateChaSkillScore("persuasion");

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
      <img
        src="/images/tavern_avatar_img.png"
        alt="Silhouette of an androgenous figure with pointed ears"
        className="w-40 h-40"
      />
      <p>{Capitalize(character.dnd_class)}</p>
      {character.dnd_class_level && <p>Level {character.dnd_class_level}</p>}
      {/* {character.subclasses && <p>{character.subclasses}</p>} */}
      <p>HP {character.hp}</p>
      <div>
        <h4>Ability Scores</h4>
        {character.abilityscores && (
          <>
            <p>Strength {character.abilityscores.str_score}</p>
            <p>{str_mod}</p>
            <p>Dexterity {character.abilityscores.dex_score}</p>
            <p>{dex_mod}</p>
            <p>Constitution {character.abilityscores.con_score}</p>
            <p>{con_mod}</p>
            <p>Intelligence {character.abilityscores.int_score}</p>
            <p>{int_mod}</p>
            <p>Wisdom {character.abilityscores.wis_score}</p>
            <p>{wis_mod}</p>
            <p>Charisma {character.abilityscores.cha_score}</p>
            <p>{cha_mod}</p>
          </>
        )}
      </div>
      <div>
        <h4>Skills</h4>
            <p>Acrobatics {acrobatics}</p>
            <p>Animal Handling {animal_handling}</p>
            <p>Arcana {arcana}</p>
            <p>Athletics {athletics}</p>
            <p>Deception {deception}</p>
            <p>History {history}</p>
            <p>Insight {insight}</p>
            <p>Intimidation {intimidation}</p>
            <p>Investigation {investigation}</p>
            <p>Medicine {medicine}</p>
            <p>Nature {nature}</p>
            <p>Perception {perception}</p>
            <p>Performance {performance}</p>
            <p>Persuasion {persuasion}</p>
            <p>Religion {religion}</p>
            <p>Sleight of Hand {sleight_of_hand}</p>
            <p>Stealth {stealth}</p>
            <p>Survival {survival}</p>
      </div>
      <div class="flex justify-center items-center align-bottom bg-white text-soft-blue hover:bg-soft-gold">
        <button onClick={() => handleDelete(character.id)}>
          Delete Character
        </button>
      </div>
      <div>
        <Link to={`/character-sheet/${character.id}/edit`}>Edit Character</Link>
      </div>
    </div>
  );
}

export default CharacterSheet;

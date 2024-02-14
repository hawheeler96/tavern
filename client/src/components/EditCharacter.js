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
  onAbscoreEdit,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({
    name: "",
    dnd_class: "",
    level: 1,
    hp: 0,
    proficienciesArr: [],
  });

  const [abscores, setAbscores] = useState({
    str_score: 0,
    dex_score: 0,
    con_score: 0,
    int_score: 0,
    wis_score: 0,
    cha_score: 0,
  });

  const prof_mod = calculateProficiency(character.level);
  const str_mod = calculateModifier(abscores.str_score);
  const dex_mod = calculateModifier(abscores.dex_score);
  const con_mod = calculateModifier(abscores.con_score);
  const int_mod = calculateModifier(abscores.int_score);
  const wis_mod = calculateModifier(abscores.wis_score);
  const cha_mod = calculateModifier(abscores.cha_score);
  const proficienciesArr = character.proficienciesArr;

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
        const response = await fetch(`/api/characters/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Character Data:", data);
          setCharacter(data);
          setAbscores(data.abilityscores);
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

      const response = await fetch(`/api/characters/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCharacter),
      });

      const responseData = await response.json();
      if (response.ok) {
        onCharacterEdit(responseData);
        if (character.abilityscores && character.abilityscores.id) {
          handleEditAbscores(character.abilityscores.id);
          navigate(`/character-sheet/${responseData.character.id}`);
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
        str_score: abscores.str_score,
        dex_score: abscores.dex_score,
        con_score: abscores.con_score,
        int_score: abscores.int_score,
        wis_score: abscores.wis_score,
        cha_score: abscores.cha_score,
      };

      console.log(updatedAbscores);

      const response = await fetch(`/api/ability-scores/${abscore_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAbscores),
      });

      const responseData = await response.json();
      if (response.ok) {
        setAbscores(responseData);
        // redirect
        // maybe update character if there's a bug
      } else {
        console.error("Failed to update abilityscores:", responseData);
      }
    } catch (error) {
      console.error("Error updating abilityscores:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center h-screen bg-slate-blue font-raleway">
        <div className="w-full max-w-xl">
          <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-soft-blue flex flex-col">
            <h3 className="text-white">Name</h3>
            <input
              type="text"
              value={character.name}
              onChange={(e) => {
                setCharacter((prevCharacter) => ({
                  ...prevCharacter,
                  name: e.target.value,
                }));
              }}
              className="rounded"
            />
            <h3 className="text-white mt-4">Class {`(in lower case)`}</h3>
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
              className="rounded"
            />
            <h3 className="text-white mt-4">Level</h3>
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
              className="rounded"
            />
            <p className="text-white italic">
              Proficiency Modifier: {prof_mod}
            </p>
            {/* {character.subclasses && <p>{character.subclasses}</p>} */}
            <h3 className="text-white mt-4">HP</h3>
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
              className="rounded"
            />
            <div className="flex justify-center flex-col">
              <h4 className="text-xl text-white text-center align-center mt-8">
                Ability Scores
              </h4>
              {character.abilityscores && (
                <>
                  <h3 className="text-white">Strength</h3>
                  <input
                    type="number"
                    value={abscores.str_score}
                    onChange={(e) => {
                      const strScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        str_score: strScore,
                      }));
                      console.log(e.target.value);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">Strength mod: {str_mod}</p>

                  <h3 className="text-white mt-4">Dexterity</h3>
                  <input
                    type="number"
                    value={abscores.dex_score}
                    onChange={(e) => {
                      const dexScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        dex_score: dexScore,
                      }));
                      console.log(e.target.value);
                      console.log(`dex: ${dexScore}`);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">Dexterity mod: {dex_mod}</p>

                  <h3 className="text-white mt-4">Constitution</h3>
                  <input
                    type="number"
                    value={abscores.con_score}
                    onChange={(e) => {
                      const conScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        con_score: conScore,
                      }));
                      console.log(e.target.value);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">
                    Constitution mod: {con_mod}
                  </p>

                  <h3 className="text-white mt-4">Intelligence</h3>
                  <input
                    type="number"
                    value={abscores.int_score}
                    onChange={(e) => {
                      const intScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        int_score: intScore,
                      }));
                      console.log(e.target.value);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">
                    {" "}
                    Intelligence mod: {int_mod}
                  </p>

                  <h3 className="text-white mt-4">Wisdom</h3>
                  <input
                    type="number"
                    value={abscores.wis_score}
                    onChange={(e) => {
                      const wisScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        wis_score: wisScore,
                      }));
                      console.log(e.target.value);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">Wisdom mod: {wis_mod}</p>

                  <h3 className="text-white mt-4">Charisma</h3>
                  <input
                    type="number"
                    value={abscores.cha_score}
                    onChange={(e) => {
                      const chaScore = parseInt(e.target.value);
                      setAbscores((prevAbscores) => ({
                        ...prevAbscores,
                        cha_score: chaScore,
                      }));
                      console.log(e.target.value);
                    }}
                    className="rounded"
                  />
                  <p className="text-white italic">Charisma mod: {cha_mod}</p>
                </>
              )}
            </div>
            {/* <div>
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
            </div> */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => {
                  handleEditCharacter();
                }}
                className="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
              >
                Edit Character
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCharacter;

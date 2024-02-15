import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

function CreateCharacter({ addCharacter, user }) {
  const [user_id, setUser_id] = useState(user.id);
  const [character_name, setCharacter_name] = useState("");
  const [dnd_class, setDnd_class] = useState("");
  const [level, setLevel] = useState("");
  const [subclasses, setSubclasses] = useState("");
  const [hp, setHp] = useState("");
  const [abilityscores_id, setAbilityscores_id] = useState("");
  const [skills_id, setSkills_id] = useState("");
  const [feats, setFeats] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("");
  const [languages, setLanguages] = useState("");
  const [gold, setGold] = useState("");
  const [party_id, setParty_id] = useState("");
  const [race_id, setRace_id] = useState("");
  const [str_score, setStr_score] = useState("");
  const [dex_score, setDex_score] = useState("");
  const [con_score, setCon_score] = useState("");
  const [int_score, setInt_score] = useState("");
  const [wis_score, setWis_score] = useState("");
  const [cha_score, setCha_score] = useState("");
  const [race_name, setRace_name] = useState("");
  const [creature_type, setCreature_type] = useState("");
  const [apiData, setApiData] = useState([]);
  const [proficienciesArr, setProficienciesArr] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const prof_mod = calculateProficiency(level);
  const str_mod = calculateModifier(str_score);
  const dex_mod = calculateModifier(dex_score);
  const con_mod = calculateModifier(con_score);
  const int_mod = calculateModifier(int_score);
  const wis_mod = calculateModifier(wis_score);
  const cha_mod = calculateModifier(cha_score);
  const navigate = useNavigate()

  const calculateStrSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficienciesArr.includes(proficiencyString)) {
      return str_mod + prof_mod;
    } else {
      return str_mod;
    }
  };

  const calculateDexSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficienciesArr.includes(proficiencyString)) {
      return dex_mod + prof_mod;
    } else {
      return dex_mod;
    }
  };

  const calculateIntSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficienciesArr.includes(proficiencyString)) {
      return int_mod + prof_mod;
    } else {
      return int_mod;
    }
  };

  const calculateWisSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficienciesArr.includes(proficiencyString)) {
      return wis_mod + prof_mod;
    } else {
      return wis_mod;
    }
  };

  const calculateChaSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficienciesArr.includes(proficiencyString)) {
      return cha_mod + prof_mod;
    } else {
      return cha_mod;
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

  const fetchApiData = async (endpoint) => {
    try {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/classes/${endpoint}`
      );
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        console.error("failed to pull data from dnd.co api");
      }
    } catch (error) {
      console.error("failed to pull data fron dnd.co api", error);
    }
  };

  const fetchProfData = async (endpoint) => {
    try {
      const response = await fetch(
        `https://www.dnd5eapi.co/api/classes/${endpoint}/levels`
      );
      if (response.ok) {
        const data = await response.json();
        setLevelsData(data);
      } else {
        console.error("failed to pull level data for class");
      }
    } catch (error) {
      console.error("failed to pull level data for class", error);
    }
  };

  console.log(`prof array ${proficienciesArr}`);

  const handleCreateCharacter = async () => {
    const newCharacter = {
      user_id,
      character_name,
      dnd_class,
      level,
      proficienciesArr,
      subclasses,
      hp,
      abilityscores_id,
      skills_id,
      feats,
      description,
      background,
      languages,
      gold,
      party_id,
      race_id,
      str_score,
      dex_score,
      con_score,
      int_score,
      wis_score,
      cha_score,
      //   acrobatics,
      //   animal_handling,
      //   arcana,
      //   athletics,
      //   deception,
      //   history,
      //   insight,
      //   intimidation,
      //   investigation,
      //   medicine,
      //   nature,
      //   perception,
      //   persuasion,
      //   performance,
      //   religion,
      //   sleight_of_hand,
      //   stealth,
      //   survival,
      race_name,
      creature_type,
    };

    try {
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
      });
      const responseData = await response.json();
      if (response.ok) {
        addCharacter(responseData.character);
        navigate(`/character-sheet/${responseData.character.id}`)
      } else {
        console.error("Failed to create character", responseData);
      }
    } catch (error) {
      console.error("Error creating character:", error);
    }

    setUser_id(user.id);
    setCharacter_name("");
    setDnd_class("");
    setLevel("");
    setSubclasses("");
    setHp("");
    setAbilityscores_id("");
    setSkills_id("");
    setFeats("");
    setDescription("");
    setBackground("");
    setLanguages("");
    setGold("");
    setParty_id("");
    setRace_id("");
    setStr_score("");
    setDex_score("");
    setCon_score("");
    setInt_score("");
    setWis_score("");
    setCha_score("");
    setRace_name("");
    setCreature_type("");
  };

  const handleCheckboxChange = (e, index) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setProficienciesArr((prevProficienciesArr) => [
        ...prevProficienciesArr,
        index,
      ]);
      console.log(proficienciesArr);
    } else {
      setProficienciesArr((prevProficienciesArr) =>
        prevProficienciesArr.filter((item) => item !== index)
      );
      console.log(proficienciesArr);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center h-full bg-slate-blue font-raleway">
        <div className="w-full max-w-xl">
          <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white flex flex-col">
            <h3 className="text-xl mb-4 text-center font-bold">
              Adventurer Registration
            </h3>
            <input
              type="text"
              placeholder="Character Name"
              value={character_name}
              onChange={(e) => {
                console.log(e.target.value);
                setCharacter_name(e.target.value);
              }}
              className="mb-2 border-b-2"
            />
            <select
              value={race_name}
              onChange={(e) => {
                console.log(e.target.value);
                setRace_name(e.target.value);
              }}
              className="mb-2"
            >
              <option value="">Select a Race</option>
              <option value="dragonborn">Dragonborn</option>
              <option value="dwarf">Dwarf</option>
              <option value="elf">Elf</option>
              <option value="gnome">Gnome</option>
              <option value="half-elf">Half-Elf</option>
              <option value="half-orc">Half-Orc</option>
              <option value="halfling">Halfling</option>
              <option value="human">Human</option>
              <option value="tiefling">Tiefling</option>
            </select>
            <select
              value={dnd_class}
              onChange={(e) => {
                console.log(e.target.value);
                setDnd_class(e.target.value);
                fetchApiData(e.target.value);
                fetchProfData(e.target.value);
              }}
              className="mb-2"
            >
              <option value="">Select a Class</option>
              <option value="barbarian">Barbarian</option>
              <option value="bard">Bard</option>
              <option value="cleric">Cleric</option>
              <option value="druid">Druid</option>
              <option value="fighter">Fighter</option>
              <option value="monk">Monk</option>
              <option value="paladin">Paladin</option>
              <option value="rogue">Rogue</option>
              <option value="sorcerer">Sorcerer</option>
              <option value="warlock">Warlock</option>
              <option value="wizard">Wizard</option>
            </select>
            <select
              value={level}
              onChange={(e) => {
                setLevel(parseInt(e.target.value));
                console.log(prof_mod);
              }}
              className="mb-2"
            >
              <option value={0}>Select a Level</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
            </select>
            {/* <input
              type="text"
              placeholder="Subclass (optional)"
              value={subclasses}
              onChange={(e) => {
                console.log(e.target.value);
                setSubclasses(e.target.value);
              }}
              className="mb-2 border-b-2"
            /> */}
            {dnd_class &&
              apiData.subclasses &&
              apiData.subclasses.length > 0 && (
                <select
                  value={subclasses}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setSubclasses(e.target.value);
                  }}
                  className="mb-2"
                >
                  <option value="">Select a Subclass - Optional</option>
                  {apiData.subclasses.map((subclass, index) => (
                    <option key={index} value={subclass.name}>
                      {subclass.name}
                    </option>
                  ))}
                </select>
              )}
            <input
              type="text"
              placeholder="Feats (optional)"
              value={feats}
              onChange={(e) => {
                console.log(e.target.value);
                setFeats(e.target.value);
              }}
              className="mb-2 border-b-2"
            />
            <input
              type="text"
              placeholder="Background"
              value={background}
              onChange={(e) => {
                console.log(e.target.value);
                setBackground(e.target.value);
              }}
              className="mb-2 border-b-2"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => {
                console.log(e.target.value);
                setDescription(e.target.value);
              }}
              className="mb-2 border-b-2"
            />
            <input
              type="text"
              placeholder="Languages"
              value={languages}
              onChange={(e) => {
                console.log(e.target.value);
                setLanguages(e.target.value);
              }}
              className="mb-2 border-b-2"
            />
            <input
              type="number"
              placeholder="Gold"
              value={gold}
              onChange={(e) => {
                console.log(e.target.value);
                setGold(e.target.value);
              }}
              className="border-b-2"
            />
          </form>
        </div>
        <div className="w-full max-w-xl">
          <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white flex flex-col">
            <div>
              <h2>Strength</h2>
              <input
                type="number"
                placeholder="Enter Strength..."
                value={str_score}
                onChange={(e) => {
                  let str = parseInt(e.target.value);
                  if (isNaN(str)) {
                    str = "";
                  }
                  setStr_score(str);
                }}
                className="italic"
              />
              {str_score !== "" ? <p>Modifier: {str_mod}</p> : null}
              <h2 className="mt-2">Dexterity</h2>
              <input
                type="number"
                placeholder="Enter Dexterity..."
                value={dex_score}
                onChange={(e) => {
                  let dex = parseInt(e.target.value);
                  if (isNaN(dex)) {
                    dex = "";
                  }
                  setDex_score(dex);
                }}
                className="italic"
              />
              {dex_score !== "" ? <p>Modifier: {dex_mod}</p> : null}
              <h2 className="mt-2">Constitution</h2>
              <input
                type="number"
                placeholder="Enter Constitution..."
                value={con_score}
                onChange={(e) => {
                  let con = parseInt(e.target.value);
                  if (isNaN(con)) {
                    con = "";
                  }
                  setCon_score(con);
                }}
                className="italic"
              />
              {con_score !== "" ? <p>Modifier: {con_mod}</p> : null}
              <h2 className="mt-2">Intelligence</h2>
              <input
                type="number"
                placeholder="Enter Intelligence..."
                value={int_score}
                onChange={(e) => {
                  let int = parseInt(e.target.value);
                  if (isNaN(int)) {
                    int = "";
                  }
                  setInt_score(int);
                }}
                className="italic"
              />
              {int_score !== "" ? <p>Modifier: {int_mod}</p> : null}
              <h2 className="mt-2">Wisdom</h2>
              <input
                type="text"
                placeholder="Enter Wisdom..."
                value={wis_score}
                onChange={(e) => {
                  let wis = parseInt(e.target.value);
                  if (isNaN(wis)) {
                    wis = "";
                  }
                  setWis_score(wis);
                }}
                className="italic"
              />
              {wis_score !== "" ? <p>Modifier: {wis_mod}</p> : null}
              <h2 className="mt-2">Charisma</h2>
              <input
                type="text"
                placeholder="Enter Charisma..."
                value={cha_score}
                onChange={(e) => {
                  let cha = parseInt(e.target.value);
                  if (isNaN(cha)) {
                    cha = "";
                  }
                  setCha_score(cha);
                }}
                className="italic"
              />
              {cha_score !== "" ? <p>Modifier: {cha_mod}</p> : null}
            </div>
            <div>
              {dnd_class && apiData.proficiency_choices && (
                <div>
                <br />
                <h2>{apiData.proficiency_choices[0]?.desc}</h2>
                </div>
              )}
              {apiData.proficiency_choices &&
                apiData.proficiency_choices[0]?.from?.options &&
                apiData.proficiency_choices[0].from.options.map(
                  (option, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={option.item.index}
                        value={option.item.index}
                        onChange={(e) => {
                          handleCheckboxChange(e, option.item.index);
                        }}
                      />
                      <label htmlFor={option.item.index}>
                         {" " + option.item.name}
                      </label>
                    </div>
                  )
                )}
            </div>
            <div>
              <br />
              <h2>HP</h2>
              {dnd_class && <p>Hit dice: d{apiData.hit_die}</p>}
              <input
                type="number"
                placeholder="Enter HP..."
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="italic"
              />
            </div>
          </form>
        </div>
        <button
          onClick={handleCreateCharacter}
          className="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
        >
          Create Character
        </button>
      </div>
    </div>
  );
}

export default CreateCharacter;

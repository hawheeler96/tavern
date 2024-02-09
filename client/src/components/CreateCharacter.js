import React, { useEffect, useState } from "react";

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

function CreateCharacter({ onCharacterCreate, user }) {
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
  const [proficiencies, setProficiencies] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const prof_mod = calculateProficiency(level);
  const str_mod = calculateModifier(str_score);
  const dex_mod = calculateModifier(dex_score);
  const con_mod = calculateModifier(con_score);
  const int_mod = calculateModifier(int_score);
  const wis_mod = calculateModifier(wis_score);
  const cha_mod = calculateModifier(cha_score);

  const calculateStrSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficiencies.includes(proficiencyString)) {
      return str_mod + prof_mod;
    } else {
      return str_mod;
    }
  };

  const calculateDexSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficiencies.includes(proficiencyString)) {
      return dex_mod + prof_mod;
    } else {
      return dex_mod;
    }
  };

  const calculateIntSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficiencies.includes(proficiencyString)) {
      return int_mod + prof_mod;
    } else {
      return int_mod;
    }
  }

  const calculateWisSkillScore = (skill) => {
     const proficiencyString = `skill-${skill}`;

     if (proficiencies.includes(proficiencyString)) {
       return wis_mod + prof_mod;
     } else {
       return wis_mod;
     }
  }

  const calculateChaSkillScore = (skill) => {
    const proficiencyString = `skill-${skill}`;

    if (proficiencies.includes(proficiencyString)) {
      return cha_mod + prof_mod;
    } else {
      return cha_mod;
    }
  }

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
  const persuasion = calculateChaSkillScore("persuasion")

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

  const handleCreateCharacter = async () => {
    const newCharacter = {
      user_id,
      character_name,
      dnd_class,
      level,
      subclasses,
      hp,
      prof_mod,
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
      str_mod,
      dex_score,
      dex_mod,
      con_score,
      con_mod,
      int_score,
      int_mod,
      wis_score,
      wis_mod,
      cha_score,
      cha_mod,
      acrobatics,
      animal_handling,
      arcana,
      athletics,
      deception,
      history,
      insight,
      intimidation,
      investigation,
      medicine,
      nature,
      perception,
      persuasion,
      performance,
      religion,
      sleight_of_hand,
      stealth,
      survival,
      race_name,
      creature_type,
    };

    try {
      const response = await fetch("/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCharacter),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert(`New character created!`);
        onCharacterCreate(responseData);
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
      setProficiencies((prevProficiencies) => [...prevProficiencies, index]);
    } else {
      setProficiencies((prevProficiencies) =>
        prevProficiencies.filter((item) => item !== index)
      );
    }
  };


  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Character Name"
          value={character_name}
          onChange={(e) => {
            console.log(e.target.value);
            setCharacter_name(e.target.value);
          }}
        />
        <select
          value={race_name}
          onChange={(e) => {
            console.log(e.target.value);
            setRace_name(e.target.value);
          }}
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
            console.log(prof_mod)
          }}
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
        <input
          type="text"
          placeholder="Subclass (optional)"
          value={subclasses}
          onChange={(e) => {
            console.log(e.target.value);
            setSubclasses(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Feats (optional)"
          value={feats}
          onChange={(e) => {
            console.log(e.target.value);
            setFeats(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Background"
          value={background}
          onChange={(e) => {
            console.log(e.target.value);
            setBackground(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => {
            console.log(e.target.value);
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Languages"
          value={languages}
          onChange={(e) => {
            console.log(e.target.value);
            setLanguages(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Gold (optional)"
          value={gold}
          onChange={(e) => {
            console.log(e.target.value);
            setGold(e.target.value);
          }}
        />
      </div>
      <div>
        <h2>Strength</h2>
        <input
          type="number"
          placeholder="Strength"
          value={str_score}
          onChange={(e) => {
            let str = parseInt(e.target.value);
            if (isNaN(str)) {
              str = "";
            }
            setStr_score(str);
          }}
        />
        <p>{str_mod}</p>
        <h2>Dexterity</h2>
        <input
          type="number"
          placeholder="Dexterity"
          value={dex_score}
          onChange={(e) => {
            let dex = parseInt(e.target.value);
            if (isNaN(dex)) {
              dex = "";
            }
            setDex_score(dex);
          }}
        />
        <p>{dex_mod}</p>
        <h2>Constitution</h2>
        <input
          type="number"
          placeholder="Constitution"
          value={con_score}
          onChange={(e) => {
            let con = parseInt(e.target.value);
            if (isNaN(con)) {
              con = "";
            }
            setCon_score(con);
          }}
        />
        <p>{con_mod}</p>
        <h2>Intelligence</h2>
        <input
          type="number"
          placeholder="Intelligence"
          value={int_score}
          onChange={(e) => {
            let int = parseInt(e.target.value);
            if (isNaN(int)) {
              int = "";
            }
            setInt_score(int);
          }}
        />
        <p>{int_mod}</p>
        <h2>Wisdom</h2>
        <input
          type="text"
          placeholder="Wisdom"
          value={wis_score}
          onChange={(e) => {
            let wis = parseInt(e.target.value);
            if (isNaN(wis)) {
              wis = "";
            }
            setWis_score(wis);
          }}
        />
        <p>{wis_mod}</p>
        <h2>Charisma</h2>
        <input
          type="text"
          placeholder="Charisma"
          value={cha_score}
          onChange={(e) => {
            let cha = parseInt(e.target.value);
            if (isNaN(cha)) {
              cha = "";
            }
            setCha_score(cha);
          }}
        />
        <p>{cha_mod}</p>
      </div>
      <div>
        {dnd_class && apiData.proficiency_choices && (
          <h2>{apiData.proficiency_choices[0]?.desc}</h2>
        )}
        {apiData.proficiency_choices &&
          apiData.proficiency_choices[0]?.from?.options &&
          apiData.proficiency_choices[0].from.options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={option.item.index}
                value={option.item.index}
                onChange={(e) => {
                  handleCheckboxChange(e, option.item.index);
                }}
              />
              <label htmlFor={option.item.index}>{option.item.name}</label>
            </div>
          ))}
      </div>
      <div>
        <h2>HP</h2>
        {dnd_class && <p>Hit dice: d{apiData.hit_die}</p>}
        <input type="number" placeholder="HP" value={hp} onChange={(e) => setHp(e.target.value)} />
      </div>
      <button onClick={handleCreateCharacter}>Create character</button>
    </div>
  );
}

export default CreateCharacter;

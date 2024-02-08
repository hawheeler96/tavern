import React, { useEffect, useState } from "react";

function CreateCharacter() {
    const [user_id, setUser_id] = useState("")
    const [character_name, setCharacter_name] = useState("")
    const [dnd_class, setDnd_class] = useState("")
    const [subclasses, setSubclasses] = useState("")
    const [hp, setHp] = useState("")
    const [abilityscores_id, setAbilityscores_id] = useState("")
    const [skills_id, setSkills_id] = useState("")
    const [feats, setFeats] = useState("")
    const [description, setDescription] = useState("")
    const [background, setBackground] = useState("")
    const [languages, setLanguages] = useState("")
    const [gold, setGold] = useState("")
    const [party_id, setParty_id] = useState("")
    const [race_id, setRace_id] = useState("")
    const [str_score, setStr_score] = useState("")
    const [str_mod, setStr_mod] = useState("")
    return (
        <h1>Create your character</h1>
    )

}

export default CreateCharacter
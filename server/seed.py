from app import app
from models import User, Character, AbilityScore, Skill, Party, Race, db
import json

if __name__ == "__main__":
    with app.app_context():
        print('Deleting data....')
        User.query.delete()
        Character.query.delete()
        AbilityScore.query.delete()
        Skill.query.delete()
        Party.query.delete()
        
        print('Creating user...')
        holly = User(name="Holly Wheeler", email="hollyawheeler.96@gmail.com", password_hash="1234")
        
        print('Populating race...')
        elf = Race(
            name = "Elf",
            languages = "Common, Elvish, Primordial",
            ability_bonuses = "Dexterity +2, Charisma +1",
            creature_type = "Humanoid",
            size = "Medium",
            speed = "30",
            traits = "Darkvision, Fey Ancestry, Trance",
            starting_proficiencies = "Skill: Perception",
            dnd_race_api_url = "https://www.dnd5eapi.co/api/races/elf"
        )
        
        print('Populating ability scores...')
        ascores = AbilityScore(
            str_score = 11,
            str_mod = 0,
            dex_score = 17,
            dex_mod = 3,
            con_score = 14,
            con_mod = 2,
            int_score= 13,
            int_mod=1,
            wis_score=13,
            wis_mod=1,
            cha_score=17,
            cha_mod=3
        )
        
        print('Populating skills...')
        skills = Skill(
            acrobatics=3,
            animal_handling=1,
            arcana=3,
            athletics=0,
            deception=3,
            history=3,
            insight=3,
            intimidation=3,
            investigation=1,
            medicine=1,
            nature=3,
            perception=3,
            performance=3,
            persuasion=5,
            religion=1,
            sleight_of_hand=3,
            stealth=3,
            survival=1,
        )
        
        print('Creating party...')
        party = Party(
            name="Adrucad's Most Wanted",
            description="Just a bunch of bozos"
        )
        
        print('Creating character...')
        nerezza = Character(
            name="Nerezza Nakadorova", 
            dnd_class="Fighter",
            subclasses="",
            dnd_class_level="Fighter 3",
            total_level=3,
            proficiency_mod=2,
            hp=23,
            hit_die="d10",
            proficiency_choices=
                {
                    "desc": "Choose two skills from Acrobatics, Animal Handling, Athletics, History, Insight, Intimidation, Perception, and Survival",
                    "choose": 2,
                    "type": "proficiencies",
                    "from": {
                        "option_set_type": "options_array",
                        "options": [
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-acrobatics",
                                    "name": "Skill: Acrobatics",
                                    "url": "/api/proficiencies/skill-acrobatics"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-animal-handling",
                                    "name": "Skill: Animal Handling",
                                    "url": "/api/proficiencies/skill-animal-handling"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-athletics",
                                    "name": "Skill: Athletics",
                                    "url": "/api/proficiencies/skill-athletics"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-history",
                                    "name": "Skill: History",
                                    "url": "/api/proficiencies/skill-history"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-insight",
                                    "name": "Skill: Insight",
                                    "url": "/api/proficiencies/skill-insight"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-intimidation",
                                    "name": "Skill: Intimidation",
                                    "url": "/api/proficiencies/skill-intimidation"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-perception",
                                    "name": "Skill: Perception",
                                    "url": "/api/proficiencies/skill-perception"
                                }
                            },
                            {
                                "option_type": "reference",
                                "item": {
                                    "index": "skill-survival",
                                    "name": "Skill: Survival",
                                    "url": "/api/proficiencies/skill-survival"
                                }
                            }
                        ]
                    }
                },
            proficiencies= [
                {
                    "index": "all-armor",
                    "name": "All armor",
                    "url": "/api/proficiencies/all-armor"
                },
                {
                    "index": "shields",
                    "name": "Shields",
                    "url": "/api/proficiencies/shields"
                },
                {
                    "index": "simple-weapons",
                    "name": "Simple Weapons",
                    "url": "/api/proficiencies/simple-weapons"
                },
                {
                    "index": "martial-weapons",
                    "name": "Martial Weapons",
                    "url": "/api/proficiencies/martial-weapons"
                },
                {
                    "index": "saving-throw-str",
                    "name": "Saving Throw: STR",
                    "url": "/api/proficiencies/saving-throw-str"
                },
                {
                    "index": "saving-throw-con",
                    "name": "Saving Throw: CON",
                    "url": "/api/proficiencies/saving-throw-con"
                }],
            saving_throws=[
                {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/ability-scores/str"
                },
                {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/ability-scores/con"
                }
            ],
            feats="",
            description="A pale elven-looking girl with choppy black hair. The lower half of her face is covered by a mask.",
            background="Noble",
            languages="Common, Elvish, Primordial",
            gold=48,
            dnd_class_api_url="https://www.dnd5eapi.co/api/classes/fighter",
            dnd_class_levels_api_url="https://www.dnd5eapi.co/api/classes/fighter/levels",
            race = elf,
            abilityscores = ascores,
            skills=skills,
            user= holly,
            party= party,
        )
        
        db.session.add(holly)
        db.session.add(elf)
        db.session.add(skills)
        db.session.add(party)
        db.session.add(nerezza)
        db.session.commit()
        
        print('Seeding done!')
        
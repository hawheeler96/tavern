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
        holly = User(name="Holly Wheeler", password_hash="1234")
        
        print('Populating race...')
        dhampir = Race(
            languages="",
            creature_type="Humanoid",
            size="Medium",
            speed=35,
            features=json.dumps([
                "Vampiric Bite",
                "Spider Climb",
            ])
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
            dnd_subclass="",
            level=3,
            proficiency=2,
            hp=23,
            feats="",
            description="A pale elven-looking girl with choppy black hair. The lower half of her face is covered by a mask.",
            background="Noble",
            languages="Common, Elvish, Primordial",
            gold=48,
            race = dhampir,
            abilityscores = ascores,
            skills=skills,
            user= holly,
            party= party,
        )
        
        db.session.add(holly)
        db.session.add(dhampir)
        db.session.add(skills)
        db.session.add(party)
        db.session.add(nerezza)
        db.session.commit()
        
        print('Seeding done!')
        
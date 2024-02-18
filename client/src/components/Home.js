import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react"

function Home({ characters, user }) {
  const [showAbout, setShowAbout] = useState(false);
  const [currentCharacters, setCurrentCharacters] = useState(0);
  const charNum = 4;

  console.log(user);

  const filteredCharacters =
    characters && user
      ? characters.filter((character) => character.user_id === user.id)
      : [];

  function scrollBeltForward() {
    if (currentCharacters + charNum < filteredCharacters.length) {
      setCurrentCharacters(currentCharacters + charNum);
    }
  }

  function scrollBeltBackward() {
    if (currentCharacters >= charNum) {
      setCurrentCharacters(currentCharacters - charNum);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center my-32">
        {filteredCharacters.length > 0 && currentCharacters > 0 ? (
          <button
            onClick={scrollBeltBackward}
            className="text-5xl text-white flex flex-wrap align-middle py-16 transition ease-in-out delay-50 hover:scale-110"
          >
            ❮
          </button>
        ) : null}
        {filteredCharacters.length > 0 ? (
          filteredCharacters
            .slice(currentCharacters, currentCharacters + charNum)
            .map((character, index) => (
              <div key={index} className="w-1/6 p-4 flex flex-col items-center">
                <nav className="flex flex-col items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110">
                  <div className="mb-2">
                    <Link to={`/character-sheet/${character.id}`}>
                      <img
                        src="/images/tavern_avatar_img.png"
                        alt="Silhouette of an androgenous figure with pointed ears"
                        className="rounded-full w-40 h-40"
                      />
                    </Link>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl text-white font-raleway transition ease-in-out delay-50 hover:text-soft-gold">
                      <Link to={`/character-sheet/${character.id}`}>
                        {character.name}
                      </Link>
                    </h3>
                  </div>
                </nav>
              </div>
            ))
        ) : (
          <div className="flex justify-center items-center flex-col">
            <p className="text-xl text-white font-raleway mt-10">
              It looks like no one's here yet. Would you like to make a
              character?
            </p>
            <Link
              to="/create-character"
              className="flex justify-center items-center w-1/2 p-2 mt-8 bg-soft-blue text-white hover:bg-soft-gold rounded"
            >
              Create a Character
            </Link>
          </div>
        )}
        {filteredCharacters.length > 0 &&
        currentCharacters + charNum < filteredCharacters.length ? (
          <button
            onClick={scrollBeltForward}
            className="text-5xl text-white flex flex-wrap align-middle py-16 transition ease-in-out delay-50 hover:scale-110"
          >
            ❯
          </button>
        ) : null}
      </div>
      <div
        className={`${
          showAbout ? "mt-96 " : ""
        } fixed bottom-0 left-0 right-0 bg bg-soft-blue`}
      >
        <div className="flex justify-center items-center">
          {!showAbout ? (
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-xl m-3 text-white flex justify-center items-center transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
            >
              ▲
            </button>
          ) : (
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-xl m-3 text-white flex justify-center items-center transition ease-in-out delay-50 hover:scale-110"
            >
              ▼
            </button>
          )}
        </div>
        <h1 className="flex justify-center items-center text-3xl m-3 text-white font-raleway">
          About
        </h1>
        <p className="flex justify-center items-center text-white italic font-ralewayc">
          As is the case in so many campaigns, it begins in a tavern.
        </p>
        <br />
        <Transition
          show={showAbout}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition ease-in-out duration-300 trasnform"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="bg-soft-blue">
            <p className="text-white font-raleway">
              Welcome to Tavern, an online character creator for Dungeons &
              Dragons 5e. Currently in its early alpha stage, Tavern is poised
              to revolutionize the way players engage with character creation
              and management in the world of D&D.
            </p>
            <br />
            <p className="text-white font-raleway">
              At Tavern, we offer a dynamic platform where players can unleash
              their creativity and bring their characters to life with ease.
              Whether you're a seasoned adventurer or new to the realms of D&D,
              our intuitive interface empowers you to effortlessly create and
              customize your characters.
            </p>
            <br />
            <p className="text-white font-raleway">
              While we're in the early stages, our vision for Tavern is
              expansive. Though our character sheets are currently limited to
              core traits and ability scores, future users will have access to
              full character sheets, including detailed equipment and actions.
            </p>
            <br />
            <p className="text-white font-raleway">
              But that's not all. We're committed to enhancing your gameplay
              experience by offering advanced features such as action filtering.
              Soon, you'll be able to filter actions by categories like healing
              moves, offensive moves, and defensive moves, as well as by action
              type—be it action, bonus action, or reaction.
            </p>
            <br />
            <p className="text-white font-raleway">
              Additionally, we believe in fostering creativity and community.
              That's why we're designing Tavern to support user-generated
              content. In the near future, users will have the ability to upload
              homebrew content without signing away their rights to it. Share
              your unique creations with fellow adventurers and enrich your
              gaming experience like never before.
            </p>
            <br />
            <p className="text-white font-raleway">
              Join us at Tavern and embark on your next adventure with
              confidence. Unleash your imagination, forge unforgettable
              characters, and let the stories unfold within the magical realms
              of Dungeons & Dragons.
            </p>
            <br />
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default Home;
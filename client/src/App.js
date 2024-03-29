import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./components/CharacterSheet";
import CreateCharacter from "./components/CreateCharacter";
import EditCharacter from "./components/EditCharacter";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Parties from "./components/Parties";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import ViewCharacters from "./components/ViewCharacters";

import "./index.css";

const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("/api/check_session")
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => console.error("Error checking session:", error));
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch("/api/characters");
        if (response.ok) {
          const data = await response.json();
          setCharacters(data);
        } else {
          console.error("Failed to fetch characters");
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };
    fetchCharacter();
  }, []);

  const handleCharacterCreate = (newCharacter) => {
    setCharacters((currentCharacters) => [...currentCharacters, newCharacter]);
  };

  const handleCharacterEdit = (editedCharacter) => {
    setCharacters((currentCharacters) => [
      ...currentCharacters,
      editedCharacter,
    ]);
  };

  const Capitalize = (str) => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "class not found";
    }
  };

  return (
    <div class="min-h-screen bg-slate-blue">
      <Router>
        <UserContext.Provider value={user}>
          <Header setUser={setUser} user={user} />
          {user === null ? (
            <Routes>
              <Route index element={<Login setUser={setUser} />} />
              <Route path="signup" element={<Signup setUser={setUser} />} />
            </Routes>
          ) : (
            <main>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home characters={characters} user={user}/>} />
                <Route
                  path="/create-character"
                  element={
                    <CreateCharacter addCharacter={handleCharacterCreate} user={user} />
                  }
                />
                <Route path="/parties-view" element={<Parties />} />
                <Route path="/user-profile" element={<UserProfile user={user} characters={characters}/>} />
                <Route
                  path="/character-sheet/:id"
                  element={<CharacterSheet Capitalize={Capitalize} setCharacters={setCharacters}/>}
                />
                <Route
                  path="/all-characters"
                  element={
                    <ViewCharacters
                      characters={characters}
                      Capitalize={Capitalize}
                      user={user}
                    />
                  }
                />
                <Route
                  path="/character-sheet/:id/edit"
                  element={
                    <EditCharacter
                      characters={characters}
                      Capitalize={Capitalize}
                      onCharacterEdit={handleCharacterEdit}
                    />
                  }
                />
              </Routes>
            </main>
          )}
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

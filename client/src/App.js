import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharacterSheet from "./components/CharacterSheet";
import CreateCharacter from "./components/CreateCharacter";
import EditCharacter from "./components/EditCharacter";
import Header from "./components/Header"
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Parties from "./components/Parties";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import ViewCharacters from "./components/ViewCharacters";
import "./index.css"

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
    fetch("/check_session")
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

     const [characters, setCharacters] = useState([]);
     useEffect(() => {
       const fetchCharacter = async () => {
         try {
           const response = await fetch("/characters");
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

    let view;
    if (user) {
        view = (
          <div>
            <NavBar />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                        user={user}
                      characters={characters}
                      setCharacters={setCharacters}
                    />
                  }
                />
                <Route path="/create-character" element={<CreateCharacter />} />
                <Route path="/parties-view" element={<Parties />} />
                <Route
                  path="/user-profile"
                  element={<UserProfile user={user} />}
                />
                <Route
                  path="/character-sheet/:id"
                  element={<CharacterSheet />}
                />
                <Route
                  path="/all-characters"
                  element={
                    <ViewCharacters
                      user={user}
                      characters={characters}
                      setCharacters={setCharacters}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        );
    } else if (user === null) {
        view = (
          <Routes>
            <Route index element={<Login setUser={setUser} />} />
            <Route path="signup" element={<Signup setUser={setUser} />} />
          </Routes>
        );
    } else {
        view = <p>Loading...</p>
    }
       
    return (
      <div class="min-h-screen bg-slate-blue">
        <Router>
          <Header setUser={setUser} user={user} />
          {view}
        </Router>
      </div>
    );
}


export default App;
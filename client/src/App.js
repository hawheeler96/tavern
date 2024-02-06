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

function App() {

return (
  <Router>
    <Header />
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create-character" element={<CreateCharacter />} /> */}
        </Routes>
      </main>
    </div>
  </Router>
);
}


export default App;
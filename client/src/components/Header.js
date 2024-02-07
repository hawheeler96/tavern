import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"

function Header({user, setUser}) {

    const logout = () => {
    fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        window.location.href = "/";
    });
    };

    let view;
    if (user) {
      view = (
        <div>
            <button type="button" onClick={logout} className="logout-button">
            Log Out
            </button>
        </div>
      );
    } else if (user === null) {
      view = null;
    }
    return (
      <header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px 20px",
          background: "#5db6ff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "white",
          }}
        >
          Welcome to the Tavern, {user ? user.name : "Traveller"}!
          <br />
        </h1>
        {view}
      </header>
    );
}

export default Header;
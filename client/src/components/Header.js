import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"

function Header({user, setUser}) {

    const logout = () => {
    fetch("/api/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        window.location.href = "/";
    });
    };

    let view;
    if (user) {
      view = (
        <div>
          <button
            type="button"
            onClick={logout}
            className="absolute end-5 top-4 p-2 rounded-md bg-soft-gold text-slate-blue font-raleway transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110"
          >
            Sign Out
          </button>
        </div>
      );
    } else if (user === null) {
      view = null;
    }
    return (
      <header
        className="flex justify-self-stretch bg-slate-blue p-5"
      >
        <h1 className="flex justify-center items-center text-2xl text-white font-raleway">
          Welcome to the Tavern, {user ? user.name : "Traveler"}!
          <br />
        </h1>
        {view}
      </header>
    );
}

export default Header;
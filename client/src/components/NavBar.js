import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
      <div>
        <h2>What can I get for you?</h2>
        <div>
          <NavLink to="/"> Home </NavLink>
          <NavLink to="/create-character"> Character Creator </NavLink>
          <NavLink to="/parties"> Parties </NavLink>
          <NavLink to="/user-profile"> User Profile </NavLink>
        </div>
      </div>
    );
}

export default NavBar;
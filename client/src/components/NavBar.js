import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <h2 class="flex justify-center items-center text-3xl m-3 text-white font-raleway">
        What can I get for you?
      </h2>
      <div class="flex flex-row flex-nowrap space-x-5 justify-center text-xl m-5 font-raleway">
        <Link to="/" class="p-2 bg-soft-blue text-white hover:bg-soft-gold">
          {" "}
          Home{" "}
        </Link>
        <Link
          to="/create-character"
          class="p-2  bg-soft-blue text-white hover:bg-soft-gold"
        >
          {" "}
          Character Creator{" "}
        </Link>
        <Link
          to="/all-characters"
          class="p-2  bg-soft-blue text-white hover:bg-soft-gold"
        >
          {" "}
          All Characters{" "}
        </Link>
        <Link
          to="/parties-view"
          class="p-2  bg-soft-blue text-white hover:bg-soft-gold"
        >
          {" "}
          Parties{" "}
        </Link>
        <Link
          to="/user-profile"
          class="p-2  bg-soft-blue text-white hover:bg-soft-gold"
        >
          {" "}
          User Profile{" "}
        </Link>
      </div>
    </div>
  );
}

export default NavBar;

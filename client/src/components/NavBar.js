import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <h2 className="flex justify-center items-center text-3xl mt-20 text-white font-raleway">
        What can I get for you?
      </h2>
      <div className="flex flex-row flex-nowrap space-x-5 justify-center text-xl m-5 font-raleway">
        <Link
          to="/"
          className="p-2 rounded-md bg-soft-blue text-white transition-colors ease-in-out delay-50 hover:bg-soft-gold hover:shadow-inner"
        >
          {" "}
          Home{" "}
        </Link>
        <Link
          to="/create-character"
          className="p-2 rounded-md bg-soft-blue text-white transition-colors ease-in-out delay-50 hover:bg-soft-gold hover:shadow-inner"
        >
          {" "}
          Character Creator{" "}
        </Link>
        <Link
          to="/all-characters"
          className="p-2 rounded-md bg-soft-blue text-white transition-colors ease-in-out delay-50 hover:bg-soft-gold hover:shadow-inner"
        >
          {" "}
          All Characters{" "}
        </Link>
        {/* <Link
          to="/parties-view"
          class="p-2  bg-soft-blue text-white hover:bg-soft-gold"
        >
          {" "}
          Parties{" "}
        </Link> */}
        <Link
          to="/user-profile"
          className="p-2 rounded-md bg-soft-blue text-white transition-colors ease-in-out delay-50 hover:bg-soft-gold hover:shadow-inner"
        >
          {" "}
          User Profile{" "}
        </Link>
      </div>
    </div>
  );
}

export default NavBar;

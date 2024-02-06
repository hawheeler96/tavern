import React, { useEffect, useState } from "react";

function Header() {
    const [users, setUsers] = useState([])
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
          Welcome to the Tavern, Traveller!
          <br />
        </h1>
      </header>
    );
}

export default Header;
import React, { useEffect, useState } from "react";

function UserProfile({user}) {
    return (
      <div>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    );
}

export default UserProfile
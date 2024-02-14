import React, { useEffect, useState } from "react";

function UserProfile({user, characters}) {
    const [unclicked, setClicked] = useState(false);

    const filteredCharacters =
      characters && user
        ? characters.filter((character) => character.user_id === user.id)
        : [];

    const handleClick = () => {
        setClicked(!unclicked);
    }

    // const handleSubmit = async () => {
    //     try {
    //         const updatedUser = {
    //             name: user.name,
    //             email: user.email,
    //         }

    //         const response = await fetch(`/api/users/${user.id}`, {
    //             method: "PATCH",
    //             headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(updatedUser),
    //         });

    //         const responseData = await response.json();
    //         if (response.ok) {
    //     } 
        
    // }

    return (
      <div className="flex flex-col justify-center items-center text-center">
        <div className="bg-soft-blue text-white p-5 font-raleway rounded-md">
          {unclicked ? (
            <div className="flex flex-col w-96">
              <input type="text" value={user.name} className="border"></input>
              <input type="text" value={user.email} className="border"></input>
              <button className="my-3 bg-soft-blue p-2 text-white cursor-pointer">
                Submit Changes
              </button>
            </div>
          ) : (
            <div>
              <h3>Name: {user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Characters: {filteredCharacters.length}</p>
            </div>
          )}
        </div>
        {/* {unclicked ? (
          <button
            onClick={handleClick}
            className="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
          >
            Edit User
          </button>
        )} */}
      </div>
    );
}

export default UserProfile
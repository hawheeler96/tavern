import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginInfo.email.trim() === "" || loginInfo.password.trim() === "") {
      alert("Email and password must be filled in.");
      return;
    }
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error("User not found");
        } else {
          throw new Error("Server error");
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };


  return (
    <div className="flex flex-col justify-center items-center font-raleway h-screen">
      <h3 className="text-xl text-white mb-10">Our doors are always open to those who know the password...</h3>
      <div class=" bg-soft-blue align-middle static mb-28 p-6 rounded-md">
        <form
          onSubmit={handleSubmit}
          class="p-60px 20px grid justify-start mx-6"
        >
          <div>
            <label htmlFor="email" className="text-white">
              Email:{" "}
            </label>
            <input
              value={loginInfo.email}
              id="email"
              name="email"
              onChange={handleLoginChange}
              style={{
                width: "100%",
                margin: "5px 0",
              }}
              className="bg-white rounded"
            />
          </div>
          <label htmlFor="password" className="text-white">
            Password:{" "}
          </label>
          <input
            value={loginInfo.password}
            id="password"
            type="password"
            name="password"
            onChange={handleLoginChange}
            style={{
              width: "100%",
              margin: "5px 0",
            }}
            class="bg-white rounded"
          />
          <div>
            <input
              type="submit"
              value="Login"
              class="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer rounded"
            />
          </div>
        </form>
        <Link
          to="/signup"
          style={{
            display: "block",
          }}
          class="m-6 text-white hover:text-soft-gold"
        >
          New here? Sign up!
        </Link>
      </div>
    </div>
  );
}

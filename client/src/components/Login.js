import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
      });
  };

  return (
    <div class="bg-slate-blue text-white">
      <form onSubmit={handleSubmit} class="p-60px 20px grid justify-start mx-6">
        <div>
          <label htmlFor="email">Email: </label>
          <input
            value={loginInfo.email}
            id="email"
            name="email"
            onChange={handleLoginChange}
            style={{
              width: "100%",
              display: "block",
              margin: "5px 0",
            }}
            class="bg-soft-blue"
          />
        </div>
        <label htmlFor="password">Password: </label>
        <input
          value={loginInfo.password}
          id="password"
          type="password"
          name="password"
          onChange={handleLoginChange}
          style={{
            width: "100%",
            display: "block",
            margin: "5px 0",
          }}
          class="bg-soft-blue"
        />
        <div>
          <input
            type="submit"
            value="Login"
            class="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
          />
        </div>
      </form>
      <Link
        to="/signup"
        style={{
          display: "block",
        }}
        class="m-6"
      >
        Not a user? Sign up here
      </Link>
    </div>
  );
}

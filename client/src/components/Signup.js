import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((r) => r.json())
      .then((data) => {
        setUser(data);
        navigate("/");
      });
  };

  return (
    <div class="bg-slate-blue">
      <form onSubmit={handleSubmit} class="p-60px 20px grid justify-start mx-6">
        <div>
          <label htmlFor="email" class="text-white">
            Email:{" "}
          </label>
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
          />
        </div>
        <div>
          <label htmlFor="password" class="text-white">
            Password:{" "}
          </label>
          <input
            onChange={handleLoginChange}
            value={loginInfo.password}
            type="password"
            id="password"
            name="password"
            style={{
              width: "100%",
              display: "block",
              margin: "5px 0",
            }}
          />
          <div>
            <label htmlFor="name" class="text-white">
              Name:{" "}
            </label>
            <input
              value={loginInfo.name}
              id="name"
              name="name"
              onChange={handleLoginChange}
              style={{
                width: "100%",
                display: "block",
                margin: "5px 0",
              }}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Sign Up"
              class="my-3 bg-soft-gold p-2 text-slate-blue cursor-pointer"
            />
          </div>
        </div>
      </form>
      <Link
        to="/"
        style={{
          display: "block",
        }}
        class="m-6 text-white"
      >
        Already a user? Sign in
      </Link>
    </div>
  );
}
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
    fetch("/api/signup", {
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
    <div className="flex flex-col justify-center items-center font-raleway h-screen">
      <h3 className="text-xl text-white mb-10">
        Ah! A new face! What's your name, traveller?
      </h3>
      <div class=" bg-soft-blue align-middle static mb-28 p-6 rounded-md">
        <form
          onSubmit={handleSubmit}
          class="p-60px 20px grid justify-start mx-6"
        >
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
              className="text-black"
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
              className="text-black"
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
                className="text-black"
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
          className="m-6 text-white hover:text-soft-gold"
        >
          Been here before? Sign in!
        </Link>
      </div>
    </div>
  );
}
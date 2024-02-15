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
        Ah! A new face! What's your name, traveler?
      </h3>
      <div className=" bg-soft-blue align-middle static mb-28 p-6 rounded-md">
        <form
          onSubmit={handleSubmit}
          className="p-60px 20px grid justify-start mx-6"
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
                margin: "5px 0",
              }}
              className="text-black rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white">
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
                margin: "5px 0",
              }}
              className="text-black rounded"
            />
            <div>
              <label htmlFor="name" className="text-white">
                Name:{" "}
              </label>
              <input
                value={loginInfo.name}
                id="name"
                name="name"
                onChange={handleLoginChange}
                style={{
                  width: "100%",
                  margin: "5px 0",
                }}
                className="text-black rounded"
              />
            </div>
            <div>
              <input
                type="submit"
                value="Sign Up"
                className="my-3 bg-soft-gold p-2 rounded text-slate-blue cursor-pointer"
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
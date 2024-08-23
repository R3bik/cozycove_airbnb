import axios from "axios";
import { useState } from "react";

import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setuserName] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function registerUser() {
    try {
      await axios.post("/register", {
        userName,
        email,
        password,
      });
      alert("Registration succesfull!");
      setRedirect(true);
    } catch (e) {
      alert("Registration failed!");
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="mt-4 flex grow items-center justify-center">
      <div className="mb-64 ">
        <h1 className="text-2xl mb-4 text-center ">Signup! </h1>
        <form
          className="relative max-w-md mx-auto  space-y-4 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
        >
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mx-40 text-center">
            <button className="primary ">Signup</button>
          </div>
          <div className="text-center py-2 text-gray-500">
            Already have an account?{" "}
            <Link to={"/login"} className="font-semibold hover:text-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

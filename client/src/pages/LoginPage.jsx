import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  async function loginUser() {
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      setUser(response.data);
      alert("login succesful!");
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-center">
      <div className="mb-64 ">
        <h1 className="text-2xl mb-4 text-center ">Login to book your hotel</h1>
        <form
          className="relative max-w-md mx-auto  space-y-4 p-3"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
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
            <button className="primary ">Login</button>
          </div>
          <div className="text-center py-2 text-gray-500">
            Don't have an account?{" "}
            <Link to={"/register"} className="font-semibold hover:text-primary">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

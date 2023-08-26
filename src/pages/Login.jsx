import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseinit";
import { action } from "../redux/signup";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate =  useNavigate()
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      dispatch(
        action.login({
          email: userCredential.user.email,
          name: userCredential.user.displayName,
          id: userCredential.user.uid,
        })
      );
      navigate("/")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Your email"
            className="border-2 border-black"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Your password"
            className="border-2 border-black"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button className="border-2 border-black">Login</button>
        </form>
      </div>
      <div>
        <h1>
          Don't have an account ?{" "}
          <span>
            <Link to="/signup">Signup</Link>
          </span>
        </h1>
      </div>
    </>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseinit";
import { useDispatch } from "react-redux";
import { action } from "../redux/signup";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [userAvatar, setUserAvatar] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgYkhH9yvzbWUTEP2GE-slINZaXSeSQv80Hg&usqp=CAU");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        // user is logged in
        dispatch(
          action.login({
            email: userCredential.email,
            displayName: userCredential.displayName,
            uid: userCredential.uid,
          })
        );
      } else {
        dispatch(action.logout());
      }
    });
  
    // Cleanup function to unsubscribe from the auth state changes
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleSingupForm = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return alert("Password is incorrect");
    }
    if (password.length < 6) {
      return alert("Please enter a password greater than 6");
    }
    if (email.length < 5) {
      return alert("Enter a valid email address");
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      await updateProfile(userCredential.user, {
        displayName: name,
      });
  
      dispatch(action.login({
        email: userCredential.user.email,
        name: name,  // Use the 'name' variable here
        id: userCredential.user.uid
      }));

      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSingupForm}>
          <input
            type="text"
            placeholder="Your name"
            className="border-2 border-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="email"
            placeholder="Your email"
            className="border-2 border-black"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="text"
            placeholder="Your password"
            className="border-2 border-black"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="border-2 border-black"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <button className="border-2 border-black">Signup</button>
        </form>
      </div>
      <div>
        Already a user{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </div>
    </>
  );
};

export default Signup;

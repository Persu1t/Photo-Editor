import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { action, signupSelector } from "../redux/signup";
import { useDispatch } from "react-redux";
import { auth } from "../firebaseinit";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useSelector(signupSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    dispatch(action.logout());
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <nav>
        <ul className="flex justify-between">
          <li className="text-lg">
            <Link to="/">React Photo Editor</Link>
          </li>
          <li className="flex justify-around w-96">
            <div>
              {user !== null ? (
                <div className="text-lg">{user.name}</div>
              ) : (
                <div>
                  <div className="text-lg">
                    <Link to="/login">Log in</Link>
                  </div>
                </div>
              )}
            </div>
            <div>
              {user && (
                <div>
                  <button onClick={handleLogout} className="text-lg">Logout</button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

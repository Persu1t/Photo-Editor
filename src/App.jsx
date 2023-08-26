import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useEffect } from "react";
// import { auth } from "./firebaseinit";
// import { useDispatch } from "react-redux";
// import { action } from "./redux/signup";
// import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> }, 
      ],
    },
    { path: "/login", element:<Login/> },
    { path: "/signup", element: <Signup/>}
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

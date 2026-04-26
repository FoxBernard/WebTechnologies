import { useState } from "react";
import Home from "../pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {

  return <Home />
  

  // 🏠 Default = HOME
  // return <Home onSignIn={() => setPage("login")} />;
  
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if (isLoggedIn) {
  //   return <Dashboard />;
  // }

  // return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
}
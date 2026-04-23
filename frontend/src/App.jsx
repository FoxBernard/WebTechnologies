import { useState } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
}
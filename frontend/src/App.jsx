<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

=======
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import { BrowserRouter, Routes, Route } from "react-router-dom";

>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC PAGES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD

        {/* PROTECTED / USER AREA (for now simple) */}
        <Route path="/dashboard" element={<Dashboard />} />

=======
        <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
      </Routes>
    </BrowserRouter>
  );
}
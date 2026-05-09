import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NabBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:9000";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        username: username.trim(),
        email: email.trim(),
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth,
      };

      // basic frontend validation
      if (!payload.username || !payload.email || !payload.password) {
        alert("Please fill in all required fields");
        return;
      }

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        role: "user"
        }),
        body: JSON.stringify(payload),
      });

      const data = await res.json();


      if (res.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        alert(data.message || data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  return (
    <div className="page">

      <div className="navbar">
        <NabBar /> 
      </div>
      
      <div className="auth-card">

        <div className="auth-left">
          <h1>Create Account</h1>
        </div>

        <div className="auth-right">
          <h2>Register</h2>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="host">Host</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit">
              REGISTER
            </button>

          </form>

          <button onClick={() => navigate("/login")}>
            Already have an account? Login
          </button>

          <button onClick={() => navigate("/")}>
            Back to Home
          </button>

        </div>
      </div>
      <div className="footer"> <Footer /> </div>
    </div>
  );
}
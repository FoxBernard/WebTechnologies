import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NabBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:9000";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/dashboard");
      } else {
        alert(data.message || data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in");
    }
  };

  return (
    <div className="page">

      <div className="navbar">
        <NabBar /> 
      </div>
      
      <div className="auth-card">
        <div className="auth-left">
          <h1>Welcome</h1>
        </div>

        <div className="auth-right">
          <h2>Sign in</h2>

          <input
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" onClick={handleLogin}>
            LOG IN
          </button>

          <button type="button" onClick={() => navigate("/register")}>
            Don't have an account? Register
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
      <Footer /> 
    </div>
    
  );
}
import { useState } from "react";
<<<<<<< HEAD

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // frontend validation (matches backend requirements)
    if (
      !form.username ||
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.dateOfBirth
    ) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
=======
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9000";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body: JSON.stringify(form),
=======
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
>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
      });

      const data = await res.json();

<<<<<<< HEAD
      if (!res.ok) {
        return setError(data.message || "Registration failed");
      }

      setSuccess("Registration successful!");

      // optional redirect
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (err) {
      console.error(err);
      setError("Server error");
=======
      if (res.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        alert(data.message || data.error);
      }

    } catch (err) {
      console.error(err);
      alert("Error registering user");
>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
    }
  };

  return (
<<<<<<< HEAD
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h1>Register</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <br />

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <br />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <br />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />

        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />
        <br />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="host">Host</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>
=======
    <div className="page">
      <div className="auth-card">
        <div className="auth-left">
          <h1>Create Account</h1>
        </div>

        <div className="auth-right">
          <h2>Register</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleRegister}>REGISTER</button>

          <button onClick={() => navigate("/login")}>
            Already have an account? Login
          </button>

          <button onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      </div>
>>>>>>> c8aa785074932e171b95456cc1cef906c9a6755c
    </div>
  );
}
import { useState } from "react";

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

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
    }
  };

  return (
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
    </div>
  );
}
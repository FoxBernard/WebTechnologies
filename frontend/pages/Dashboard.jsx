import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventList from "../components/EventList";
import NabBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("create");

  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    venue: "",
    start: "",
    end: "",
  });

  useEffect(() => {
    async function load() {
      const meRes = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      const meData = await meRes.json();

      if (!meRes.ok || !meData.user) {
        navigate("/login");
        return;
      }

      setUser(meData.user);

      const eventsRes = await fetch(`${API_URL}/api/events`, {
        credentials: "include",
      });

      const eventsData = await eventsRes.json();
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    }

    load();
  }, [navigate]);

  const handleCreate = async () => {
    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        hostID: user._id,
        date: { start: form.start, end: form.end },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setEvents((prev) => [...prev, data]);
      setView("manage");
    } else {
      alert(data.error || "Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <NabBar />
      {/* SIDEBAR */}
      <div style={{ width: "200px" }}>
        <h3>Dashboard</h3>

        <button onClick={() => setView("create")}>Create</button>
        <button onClick={() => setView("manage")}>Manage</button>

        <button
          onClick={() => {
            fetch(`${API_URL}/api/auth/logout`, {
              method: "POST",
              credentials: "include",
            }).then(() => navigate("/login"));
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1 }}>
        {view === "create" && (
          <div>
            <h2>Create Event</h2>

            {Object.keys(form).map((key) => (
              <input
                key={key}
                placeholder={key}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            ))}

            <button onClick={handleCreate}>Create</button>
          </div>
        )}

        {view === "manage" && <EventList events={events} />}
      </div>
      <Footer />
    </div>
    
  );
}
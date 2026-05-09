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
  }, [API_URL, navigate]);

  const handleCreate = async () => {
    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        hostID: user._id,
        date: {
          start: form.start,
          end: form.end,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setEvents((prev) => [...prev, data]);
      setView("manage");
      setForm({
        title: "",
        description: "",
        location: "",
        venue: "",
        start: "",
        end: "",
      });
    } else {
      alert(data.error || "Failed");
    }
  };

  const handleLogout = () => {
    fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => navigate("/login"));
  };

  return (
    <div className="page">
      <NabBar />

      <div className="dashboard-page">
        <aside className="sidebar">
          <h2>Dashboard</h2>

          <button onClick={() => setView("create")}>Create</button>
          <button onClick={() => setView("manage")}>Manage</button>
          <button onClick={handleLogout}>Logout</button>
        </aside>

        <main className="dashboard-content">
          {view === "create" && (
            <div className="event-form">
              <h1>Create Event</h1>

              {Object.keys(form).map((key) => (
                <input
                  key={key}
                  placeholder={key}
                  value={form[key]}
                  type={key === "start" || key === "end" ? "datetime-local" : "text"}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                />
              ))}

              <button onClick={handleCreate}>Create</button>
            </div>
          )}

          {view === "manage" && <EventList events={events} />}
        </main>
      </div>

      <Footer />
    </div>
  );
}
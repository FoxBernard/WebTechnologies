import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:9000";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [venue, setVenue] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    async function loadUserAndEvents() {
      try {
        const meRes = await fetch(`${API_URL}/api/auth/me`, {
          credentials: "include",
        });

        const meData = await meRes.json();

        if (!meRes.ok || !meData.success || !meData.user) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        setUser(meData.user);

        const eventsRes = await fetch(`${API_URL}/api/events`, {
          credentials: "include",
        });

        const eventsData = await eventsRes.json();
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      } catch (err) {
        console.error("Dashboard load error:", err);
        alert("Please login first");
        navigate("/login");
      }
    }

    loadUserAndEvents();
  }, [navigate]);

  const handleCreateEvent = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    if (!title || !description || !location || !venue || !start || !end) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          location,
          venue,
          hostID: user.id || user._id,
          date: {
            start,
            end,
          },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Event created successfully!");

        setEvents([...events, data]);

        setTitle("");
        setDescription("");
        setLocation("");
        setVenue("");
        setStart("");
        setEnd("");
      } else {
        alert(data.error || data.message || "Error creating event");
      }
    } catch (err) {
      console.error("Create event error:", err);
      alert("Error creating event");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <h2>My events</h2>
        <p onClick={() => navigate("/")}>Home</p>
        <p>Create Event</p>
        <p>Manage Events</p>
        <p>Invite Others</p>

        <div className="sidebar-user">
          <p>Hey {user ? user.username : "User"}!</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="dashboard-content">
        <h1>Create Event</h1>

        <div className="event-form">
          <input
            placeholder="Event name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            placeholder="Event venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <button onClick={handleCreateEvent}>Post Event</button>
        </div>

        <section className="dashboard-events">
          <h2>All Events</h2>

          {events.length === 0 ? (
            <p>No events created yet.</p>
          ) : (
            events.map((event) => (
              <div className="dashboard-event-item" key={event._id}>
                <strong>{event.title}</strong>
                <span>{event.location}</span>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
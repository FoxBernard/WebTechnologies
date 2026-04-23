import { useEffect, useState } from "react";
import { getMe, login, logout } from "../api/auth";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ======================
  // LOAD USER + EVENTS
  // ======================
  useEffect(() => {
    const init = async () => {
      const me = await getMe();

      if (!me.success) {
        window.location.href = "/login";
        return;
      }

      setUser(me.user);

      const res = await fetch("http://localhost:9000/events", {
        credentials: "include",
      });
      const data = await res.json();

       setEvents(data.events || []);
    };

    init();
  }, []);

  // ======================
  // CREATE EVENT
  // ======================
  const createEvent = async () => {
    const res = await fetch("http://localhost:9000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description }),
    });

    const data = await res.json();

    setEvents([...events, data.event || data]);
    setTitle("");
    setDescription("");
  };

  // ======================
  // UI
  // ======================
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>Welcome, {user.username}</p>

      {/* CREATE EVENT */}
      <div>
        <h2>Create Event</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={createEvent}>Create</button>
      </div>

      {/* EVENT LIST */}
      <div>
        <h2>Your Events</h2>

        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => setSelectedEvent(event)}
            style={{ cursor: "pointer", margin: "10px 0" }}
          >
            <strong>{event.title}</strong>
          </div>
        ))}
      </div>

      {/* EVENT DETAILS */}
      {selectedEvent && (
        <div>
          <h2>Event Details</h2>

          <p>{selectedEvent.title}</p>
          <p>{selectedEvent.description}</p>

          <button>Invite Users (next step)</button>
          <button>Comments (next step)</button>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const API_URL = "http://localhost:9000";

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`${API_URL}/api/events`, {
          credentials: "include",
        });

        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    }

    loadEvents();
  }, []);

  return (
    <>
      <div className="navbar">
        <h2>INVITY</h2>
        <div>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </div>

      <div className="hero-banner">
        <h1>INVITY</h1>
      </div>

      <div className="events-container">
        {events.length === 0 ? (
          <p>No events available yet.</p>
        ) : (
          events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              description={event.description}
              location={event.location}
              venue={event.venue}
              start={event.date?.start}
            />
          ))
        )}
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} INVITY Events. All rights reserved.</p>
      </footer>
    </>
  );
}
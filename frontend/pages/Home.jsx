import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import NabBar from "../components/NavBar";
import Footer from "../components/Footer";

const API_URL = "http://localhost:9000";

export default function Home() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(`${API_URL}/api/events`, {
          credentials: "include",
        });

        const data = await res.json();
        const safeData = Array.isArray(data) ? data : [];
        setEvents(safeData);
        setFilteredEvents(safeData);
      } catch (err) {
        console.error("Error loading events:", err);
      }
    }

    loadEvents();
  }, []);

  const handleSearch = (filters) => {
    
    const filtered = events.filter((event) => {
      const matchesLocation = !filters.location || event.location?.toLowerCase().includes(filters.location.toLowerCase());
      const matchesQuery = !filters.query || event.title?.toLowerCase().includes(filters.query.toLowerCase());
      const matchesDate = !filters.date || event.date?.slice(0, 10) === filters.date;

      return ( matchesLocation && matchesQuery &&matchesDate);
    });

    setFilteredEvents(filtered);
  };

  return (
    <>
      <div className="navbar">
        <NabBar /> 
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="hero-banner">
        <h1>INVITY</h1>
      </div>

      <div className="events-container">
        {filteredEvents.length === 0 ? (
          <p>No matching events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              showComments={false} 
            />
          ))
        )}
      </div>

      <Footer />

    </>
  );
}
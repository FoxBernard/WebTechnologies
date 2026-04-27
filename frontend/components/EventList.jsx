import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventList({filters}) {

    const[events, setEvents] = useState([]);

    // Getting actual data from the database 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/events`, { credentials: "include"})
            .then((res) => res.json())
            .then((data)=> { console.log("Fetched events:", data );
                setEvents(data);
            setEvents(data);
            })
            .catch((err) => console.error("Error fetching events:", err));
    }, []);

    // Implementing the filter logic 
    const filteredEvents = events.filter((event) => {

        const matchesLocation = event.location.toLowerCase().includes((filters?.location || "").toLowerCase());
        const matchesDate = !filters?.date || new Date(event.date.start).toISOString().slice(0, 10) === filters.date;
        const matchesQuery = event.title.toLowerCase().includes((filters?.query || "").toLowerCase()) || event.venue.toLowerCase().includes((filters?.query || "").toLowerCase());

        // returns found results 
        return matchesLocation && matchesDate && matchesQuery;
    })

    return ( 
        <div className="eventList">
            {filteredEvents.map((event) => (
                <EventCard 
                    key={event._id} 
                    title={event.title} 
                    description={event.description}
                    location={event.location}
                    venue={event.venue}
                    start={event.date.start}
                    end={event.date.end}
                />
                ))}
        </div>

    );
}
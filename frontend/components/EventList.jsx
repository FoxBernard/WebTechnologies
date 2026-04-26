import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function EventList() {


    // Mock data for testing purposes
    // const  events = [ 
    //     {title: "Party ", description: "At my place" },
    //     { title: "Concert ", description: "Tame Impala" },
    //     { title: "Festival ", description: "All together" }
    // ];

    const[events, setEvents] = useState([]);

    // Getting actual data from the database 
    useEffect(() => {
        fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/events`, { credentials: "include"})
            .then((res) => res.json())
            .then((data)=> { console.log("Fetched events:", data);
            setEvents(data);
            })
            .catch((err) => console.error("Error fetching events:", err));
    }, []);


    return ( 
        <div className="event-list">
            {events.map((event, index) => (
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
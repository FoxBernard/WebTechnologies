import EventCard from "./EventCard";

export default function EventList({ events }) {
  return (
    <div className="eventList">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}
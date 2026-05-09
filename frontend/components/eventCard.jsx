import Comments from "./Comments";

export default function EventCard({ event, showComments = true }) {
  if (!event?._id) return null;

  return (
    <div className="eventCard">
      <h3>{event.title}</h3>
      <p>{event.location}</p>
      <p>{event.venue}</p>

      {/* COMMENTS ONLY IF ALLOWED */}
      {showComments && <Comments eventId={event._id} />}
    </div>
  );
}
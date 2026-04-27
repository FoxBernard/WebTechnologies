export default function EventCard({ title, description, location, venue, start }) {
  const formattedDate = start
    ? new Date(start).toLocaleString()
    : "Date TBC";

  return (
    <div className="eventCard">
      <div className="imagePlaceholder">
        <h1>EVENT</h1>
      </div>

      <div className="eventInfo">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>📍 {location || "Location TBC"}</p>
        <p>{venue || "Venue TBC"}</p>
        <p>🕒 {formattedDate}</p>
      </div>
    </div>
  );
}
import React from "react"

export default function EventCard({ title, description, location, venue, start, end  }) {


    const formattedDate = new Date(start).toLocaleDateString();
    
    return (

        <div className="eventCard">

            <div className="imagePlaceholder">
                <h1>IMAGE FOR EVENT</h1>
            </div>

            <div className="eventInfo">
                <h3>{title}</h3>
                <p>{description}</p>
                <p><strong>📍 {location}</strong></p>
                <p>{venue}</p>
                <p>🕒 {formattedDate}</p>
            </div>

        </div>

    );
}
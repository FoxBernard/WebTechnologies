import react from "react"

export default function EventCard() {

    console.log("EventCard is rendering", props);
    
    return (

        <div className="card">
            <h2>{title}</h2>
            <P>{description}</P>
        </div>

    );
}
import { NavBar } from "../components/navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/footer";


export default function Home () {

    return (
        <>
      <NavBar />

      <div>
        <EventCard title="Party 🎉" description="At my place" />
      </div>

      <Footer />
    </>
    );
}
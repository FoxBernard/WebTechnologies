import  NavBar  from "../components/navbar";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import EventList from "../components/EventList";
import Footer from "../components/footer";


export default function Home () {

  return (
    <>
    <NavBar />
    <SearchBar />
    <Banner />
    <EventList />
    <Footer />
    </>
    );
}
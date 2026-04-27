import  NavBar  from "../components/navbar";
import SearchBar from "../components/SearchBar";
import Banner from "../components/Banner";
import EventList from "../components/EventList";
import Footer from "../components/footer";
import { useState } from "react";


export default function Home () {

  const [filters, setFilters] = useState({
    location: "",
    date: "",
    query: ""
  });

  return (
    <>
    <NavBar />
    <SearchBar onSearch={setFilters}/>
    <Banner />
    <EventList filters={filters}/>
    <Footer />
    </>
    );
}
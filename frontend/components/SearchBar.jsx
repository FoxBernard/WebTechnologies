import { useState } from "react";

export default function SearchBar({onSearch}) {
  
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");

  // Inserting mechanism the updates live as the user type onto the search bar
  const updateSearch = (newValues) => { const updated = { location, date, query, ...newValues};

  if (newValues.location !== undefined) {
    setLocation(newValues.location);
  }
  if (newValues.date !== undefined) {
    setDate(newValues.date);
  }
  if (newValues.query !== undefined) {
    setQuery(newValues.query);
  }

  onSearch(updated);
 };

  return (
    <div className="searchbar">
      <input placeholder="Location" value={location} onChange={(e) => updateSearch({ location: e.target.value })}/>
      <input type="Date" value={date} onChange={(e) => updateSearch({ date: e.target.value })}/>
      <input placeholder="Query" value={query} onChange={(e) => updateSearch({ query: e.target.value })} />
    </div>
  );
}
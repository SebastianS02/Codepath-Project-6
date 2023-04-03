import { useState, useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [sortByDate, setSortByDate] = useState("closest-furthest");

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `https://api.seatgeek.com/2/events?client_id=${API_KEY}&q=${searchTerm}`;
        if (location) {
          url += `&venue.city=${location}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        let sortedEvents = data.events;
        if (sortByDate == "closest-furthest") {
          sortedEvents = sortedEvents.sort(
            (a, b) => new Date(a.datetime_local) - new Date(b.datetime_local)
          );
        } else if (sortByDate == "furthest-closest") {
          sortedEvents = sortedEvents.sort(
            (a, b) => new Date(b.datetime_local) - new Date(a.datetime_local)
          );
        }
        setEvents(sortedEvents);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searchTerm, location, sortByDate]);

  return (
    <div className="whole-page">
      <h1>Event List</h1>
      <div className="search">
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Chicago">Chicago</option>
          <option value="Houston">Houston</option>
          <option value="San Jose">San Jose</option>
          <option value="Phoenix">Phoenix</option>
          <option value="Philadelphia">Philadelphia</option>
          <option value="San Antonio">San Antonio</option>
          <option value="Columbus">Columbus</option>
          <option value="San Francisco">San Francisco</option>
          <option value="San Diego">San Diego</option>
          <option value="New York">New York</option>
          <option value="Dallas">Dallas</option>
          <option value="Austin">Austin</option>
          <option value="Jacksonville">Jacksonville</option>
          <option value="Fort Worth">Fort Worth</option>
          <option value="Charlotte">Charlotte</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Indianapolis">Indianapolis</option>
          <option value="Boston">Boston</option>
          <option value="Nashville">Nashville</option>
          <option value="Seattle">Seattle</option>
          <option value="Denver">Denver</option>
          <option value="Washington">Washington, D.C.</option>
          <option value="El Paso">El Paso</option>
          <option value="Detroit">Detroit</option>
        </select>
        <input
          type="text"
          placeholder="Search events by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
          <option value="closest-furthest">Date: closest-furthest</option>
          <option value="furthest-closest">Date: furthest-closest</option>
        </select>
      </div>
      <ul className="concerts">
        {events.map((event) => (
          <li className="concert" key={event.id}>
            <h2>{event.title}</h2>
            <p>Type: {event.type}</p>
            <p>Date: {event.datetime_local}</p>
            <p>TimeZone: {event.venue.timezone}</p>
            <p>Venue: {event.venue.name}</p>
            <p>Location: {event.venue.display_location}</p>
            <p>Address: {event.venue.address}</p>
            <img
              src={event.performers[0].image}
              alt={event.performers[0].name}
            />
            <br></br>
            <a href={event.url} target="_blank">
              Buy Tickets
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
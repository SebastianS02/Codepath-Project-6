import { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function Home() {
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
        if (sortByDate === "closest-furthest") {
          sortedEvents = sortedEvents.sort(
            (a, b) => new Date(a.datetime_local) - new Date(b.datetime_local)
          );
        } else if (sortByDate === "furthest-closest") {
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

  function CategoriesChart({ events }) {
    const categories = events.reduce((acc, event) => {
      if (!event.type) return acc;
      const category = event.type.name;
      if (acc[category]) {
        acc[category] += 1;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});

    const data = Object.keys(categories).map((category) => ({
      name: "Number of Events",
      count: categories[category],
    }));

    return (
      <BarChart width={400} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    );
  }

  return (
    <div className="App">
      <h1>SeatGeek Event Finder</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search events by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
          <option value="closest-furthest">Closest to Furthest</option>
          <option value="furthest-closest">Furthest to Closest</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="content">
        <div className="chart">
          <CategoriesChart events={events} />
        </div>
        <ul className="concerts">
          {events.map((event) => (
            <li className="concert" key={event.id}>
              <Link to={`/event/${event.id}`} target="_blank">
                <h2>{event.title}</h2>
              </Link>
              <p>Date: {event.datetime_local}</p>
              <p>Location: {event.venue.display_location}</p>
              <img
                src={event.performers[0].image}
                alt={event.performers[0].name}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
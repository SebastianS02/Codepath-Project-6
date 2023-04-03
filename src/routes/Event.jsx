import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.seatgeek.com/2/events/${id}?client_id=${API_KEY}`
        );
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id])

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>{event.title}</h1>
      <p>Type: {event.type}</p>
      <p>Date: {event.datetime_local}</p>
      <p>TimeZone: {event.venue.timezone}</p>
      <p>Venue: {event.venue.name}</p>
      <p>Location: {event.venue.display_location}</p>
      <p>Address: {event.venue.address}</p>
      <img src={event.performers[0].image} alt={event.performers[0].name} />
      <br></br>
      <a href={event.url} target="_blank">
        Buy Tickets
      </a>
    </div>
  );
};

export default Event;
import { useState, useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(0);

  useEffect(() => {
    const fetchAllSeatsData = async () => {
      const response = await fetch(
        `https://api.seatgeek.com/2/events?client_id=${API_KEY}`
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllSeatsData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <h1>Event List</h1>
    </div>
  )
}

export default App

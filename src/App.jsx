import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/Home"
import Event from "./routes/Event"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App
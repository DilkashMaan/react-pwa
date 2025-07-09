import { useState } from "react";
import Login1 from "./components/login/Login1";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing1 from "./components/landing/Landing1";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route path="/landing" element={<Landing1 />} />
      </Routes>
    </Router>
  );
}

export default App;

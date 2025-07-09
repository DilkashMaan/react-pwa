import { useState } from "react";
import Login1 from "./components/login/Login1";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login1></Login1>
    </>
  );
}

export default App;

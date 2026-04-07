import { useState } from "react";
import AppRouter from "./router/AppRouter";

function App() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <AppRouter 
      darkMode={darkMode} 
      toggleDarkMode={toggleDarkMode} 
    />
  );
}

export default App;
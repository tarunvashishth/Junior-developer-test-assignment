import List from "./container/List";
import Add from "./container/Add";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/add" element={<Add/>} />
      </Routes>
    </Router>
  );
}

export default App;

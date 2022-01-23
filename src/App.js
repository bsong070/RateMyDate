import "./index.css";
import React, { StrictMode } from "react";
import Home from "./Home";
import NewEntry from "./NewEntry";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newreview" element={<NewEntry />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

import "./index.css";
import React, { StrictMode } from "react";
import Home from "./Home";
import NewEntry from "./NewEntry";
import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/RateMyDate/" element={<Home />} />
          <Route path="/RateMyDate/newreview" element={<NewEntry />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import './App.css';
import background from "./assets/background.png";

import Login from './screens/Login';
import Register from './screens/Register';
import CarSearch from "./screens/CarSearch";
import CarAdd from "./screens/CarAdd";
import MessageReceiver from "./screens/MessageReceiver";

import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {

  return (
    <div>
      <div className="container-custom" style={{ backgroundImage: `url(${background})` }}>
        <div className="limiter">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/User" element={<Register />} />
              <Route path="/Cars" element={<CarSearch />} />
              <Route path="/Car" element={<CarAdd />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}


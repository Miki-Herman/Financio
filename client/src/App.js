import './App.css';
import React from 'react';
import Register from './bricks/Register'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Routes/Home"
import NotFound from "./Routes/404"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/home" Component={Home}/>
          <Route path="/404" Component={NotFound}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

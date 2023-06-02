import React from 'react';
import Concert from "./Concertsrc/Concert";
import Construct from "./Constructsrc/Concert";
import Staking from "./Stakingsrc/Staking"
import Home from "./Homesrc/HomePage"
import Activity from './Activitysrc/ActivityPage';
import Information from './Informationsrc/Information';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route
                    path="/Activity"
                    element={<Activity />}
                />
                <Route
                    path="/Seller"
                    element={<Construct />} 
                />
                <Route path="/concert" element={<Concert />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/concert/mint" element={<Information />} />
            </Routes>
        </Router>
    );
}

export default App;

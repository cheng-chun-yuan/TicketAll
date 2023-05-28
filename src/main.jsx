import React from "react";
import { createRoot } from "react-dom/client";
import Concert from "./Concertsrc/Concert";
import Construct from "./Constructsrc/Concert";
import Staking from "./Stakingsrc/Staking"
import Home from "./Homesrc/HomePage"
import Show from "./show"
import Activity from './Activitysrc/ActivityPage';
import Information from './Informationsrc/Information';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={activeChain}>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Activity" element={<Activity/>} />
            <Route path="/Seller" element={<Construct/>} />
            <Route path="/concert" element={<Concert />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/concert/mint" element={<Information />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import Concert from "./Concertsrc/Concert";
import Staking from "./Stakingsrc/Staking"
import HomePage from './Homesrc/HomePage';
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
            <Route path="/" element={<HomePage/>} />
            <Route path="/concert" element={<Concert />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/concert/mint" element={<Information />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);

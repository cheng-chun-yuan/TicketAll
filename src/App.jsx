import MainMint from './MainMint';
import Navbar from './Navbar';
import Multistep from './Basic3step'
import { Box } from '@chakra-ui/react'
import BgImage from './assets/background/071.gif'


export default function Home() {
  
  return (
    <Box className="overlay">
      <Box className="App">
        <Navbar />
        <MainMint/>
        <Multistep />
      </Box>

      <Box
        className="moving-background"
        backgroundImage={BgImage}
      >

      </Box>
    </Box>
  );
}

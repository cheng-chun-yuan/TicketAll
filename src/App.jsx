import MainMint from './MainMint';
import Navbar from './Navbar';
import Newnavbar from './newnavbar';
import Multistep from './Basic3step'
// import {Form1,Form2,Form3} from './Basic3step'
import { Box } from '@chakra-ui/react'
import BgImage from './assets/background/071.gif'


export default function Home() {
  
  return (
    <Box className="overlay">
      <Box className="App">
        <Newnavbar/>
        <MainMint/>
        <Multistep/>
      </Box>

      <Box
        className="moving-background"
        backgroundImage={BgImage}
      >

      </Box>
    </Box>
  );
}

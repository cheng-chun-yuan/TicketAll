import MintInfo from './MintInfo';
import Mintnavbar from './mintnavbar';
import Multistep from './Basic3step'
// import {Form1,Form2,Form3} from './Basic3step'
import { Box } from '@chakra-ui/react'
import BgImage from './assets/background/071.gif'
import Footer from './footer'


export default function Home() {
  
  return (
    <Box className="overlay">
      <Box className="App">
        <Mintnavbar/>
        <MintInfo/>
        <Multistep/>
        <Footer/>
      </Box>

      <Box
        className="moving-background"
        backgroundImage={BgImage}
      >

      </Box>
    </Box>
  );
}

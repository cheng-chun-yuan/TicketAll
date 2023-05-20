import Content from './MintInfo';
import Backnavbar from './backnavbar';
import Info from './info'
// import {Form1,Form2,Form3} from './Basic3step'
import { Box } from '@chakra-ui/react'
import BgImage from './assets/background/071.gif'
import Footer from './footer'


export default function Home() {

    return (
        <Box className="overlay">
            <Box className="App">
                <Backnavbar />
                <Info/>
                <Footer />
            </Box>

            <Box
                className="moving-background"
                backgroundImage={BgImage}
            >

            </Box>
        </Box>
    );
}
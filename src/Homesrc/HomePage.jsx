
// <a href="mint" class="button">Go to Mint</a>
import Homeinfo from './Homeinfo';
import Homenavbar from './homenavbar';
// import {Form1,Form2,Form3} from './Basic3step'
import { Box} from '@chakra-ui/react'
import BgImage from '../assets/background/071.gif'
import Footer from '../footer'

function HomePage() {

    return (
        <Box className="overlay">
            <Box className="App">
                <Homenavbar />
                <Homeinfo />
                <Footer />
            </Box>
            <Box
                className="moving-background"
                backgroundImage={BgImage}
            />
        </Box>
    );
}
export default HomePage;

import Backnavbar from './backnavbar';
import Instake from './instake'
import { Box } from '@chakra-ui/react'
import BgImage from '../assets/background/071.gif'
import Footer from '../footer'


function Home() {
    return (
        <Box className="overlay">
            <Box className="App">
                <Backnavbar />
                <Instake/>
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
export default Home;
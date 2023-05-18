
// <a href="mint" class="button">Go to Mint</a>
import MainMint from './MainMint';
import Simple from './homenavbar';
// import {Form1,Form2,Form3} from './Basic3step'
import { Box} from '@chakra-ui/react'
import BgImage from './assets/background/071.gif'
import Footer from './footer'
import {Appp} from './Appp'

export default function NewPage() {

    return (
        <Box className="overlay">
            <Box className="App">
                <Simple />
                <MainMint />
                <Appp/>
                <Footer />
            </Box>

            <Box
                className="moving-background"
                backgroundImage={BgImage}
            />
        </Box>
    );
}

import React from 'react'
import { Flex, Box, Text, Spacer } from '@chakra-ui/react'
const Content = () => {
    return (
        <Flex justify="center" align="center" >
            <Flex
                w={'100%'}
                flexDirection={'column'}
            >
                <Box>
                    <div className="mint-container">
                        <Text fontSize="3xl" textShadow="0 5px #000" color={"pink.300"}>071 Concert</Text>
                        <Text
                            fontSize="3xl"
                            letterSpacing="0.5%"
                            fontFamily="VT323"
                            textShadow="0 2px 2px #000"
                        >
                            Ready to witness an unprecedented music extravaganza? 
                            <Spacer />
                            For ticket information and further details, please click the Mint button above.
                        </Text>
                    </div>
                </Box>
            </Flex>
        </Flex >
    )
}

export default Content;
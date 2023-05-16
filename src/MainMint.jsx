import React from 'react'
import { Flex, Box, Text,Spacer} from '@chakra-ui/react'
const MainMint = () => {
  return (
    <Flex justify="center" align="center" >
      <Flex
        w={'100%'}
        flexDirection={'column'}
      >
        <Box>
          <div className="mint-container">
            <Text fontSize="3xl" textShadow="0 5px #000" color={"pink.300"}>Buymeticket</Text>
            <Text
              fontSize="3xl"
              letterSpacing="0.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000"
            >
              I hate scalper ticket.
              <Spacer/>
              Our mission is to ensure that all fan can buy a ticket at fair price.
            </Text>
          </div>
        </Box>
      </Flex>
    </Flex >
  )
}

export default MainMint
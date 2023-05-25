import React from 'react'
import { Flex, Box, Text, Spacer, Heading, SimpleGrid, Image, Link, Center, Button, Input } from '@chakra-ui/react'
import Seller from '../assets/social-media-icons/seller.jpeg'
import Buyer from '../assets/social-media-icons/buyer.jpeg'
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
              Choose your role
            </Text>
          </div>
        </Box>
        <Box>
            <Heading>Alias:</Heading>
            <Input type="text" id="alias" placeholder="Username, Email etc" />
            <Button id="passwordless-register" onClick={handleRegisterClick} color={'black'}>Register</Button>
            <Button id="passwordless-signin" onClick={handleSigninClick} color={'black'}>Login</Button>
            {/* <Flex align="center" justify="center">
            <Text mb='8px'>Alias:</Text>
            <Input
              width="250px"
              height="35px"
              textAlign="center"
              type="text"
              value={valuee}
              onChange={handleChange}
              placeholder='Enter username'
              size='sm'
            />
          </Flex>
          <Button id="passwordless-register" color={'black'}>Register</Button>
          <Button id="passwordless-signin" color={'black'}>Login</Button> */}
        </Box>
        <Box>
          <Box
            borderWidth="1px"
            sx={
              {
                backgroundColor: "black",
                opacity: 0.85
              }
            }
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={1200}
            p={6}
            m="10px auto"
          >
            <SimpleGrid columns={2} spacing={10}>
              <Box>
                <Heading
                  fontSize="3xl"
                  color={'pink.300'}
                  fontFamily="VT323"
                  textShadow="0 2px 2px #000"
                >
                  Buyer
                </Heading>
                <Link href='/Activity' >
                  <Center>
                    <Image src={Buyer}>
                    </Image>
                  </Center>
                </Link>
              </Box>
              <Box>
                <Heading
                  fontSize="3xl"
                  color={'pink.300'}
                  fontFamily="VT323"
                  textShadow="0 2px 2px #000"
                >
                  Seller
                </Heading>
                <Link href='/Seller' >
                  <Center>
                    <Image src={Seller}>
                    </Image>
                  </Center>
                </Link>
              </Box>
            </SimpleGrid>

          </Box>
        </Box>
      </Flex>
    </Flex >
  )
}

export default MainMint
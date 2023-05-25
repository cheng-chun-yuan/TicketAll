import React from 'react'
import { useAddress } from "@thirdweb-dev/react";
import { Flex, Box, Text, Spacer, Heading, SimpleGrid, Image, Link, Center, Button, Input } from '@chakra-ui/react'
import Seller from '../assets/social-media-icons/seller.jpeg'
import Buyer from '../assets/social-media-icons/buyer.jpeg'
const MainMint = () => {
  const address = useAddress()
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
          <Input type="text" id="alias" placeholder="wallet address" />
          <Button
            onClick={async function handleRegisterClick(e) {
              e.preventDefault();

              const alias = document.getElementById("alias").value;
              // Status("Starting registering...");

              const p = new Passwordless.Client({
                apiKey: API_KEY
              });

              const backendRequest = await fetch(
                BACKEND_URL + "/create-token?alias=" + alias
              );
              const backendResponse = await backendRequest.json();
              if (!backendRequest.ok) {
                console.log("Our backend failed while creating a token: ");
                return;
              }
              const { token, error } = await p.register(backendResponse.token);
            }}
            color={'black'}
          >
            Register
          </Button>
          <Button
            onClick={async function handleSigninClick(e) {
              e.preventDefault();
              const alias = document.getElementById("alias").value;


              /**
               * Initiate the Passwordless client with your public api key
               */
              const p = new Passwordless.Client({
                apiKey: API_KEY,
              });

              try {
                /**
                 * Sign in - The Passwordless API and the browser initiates a sign in based on the alias
                 */

                //var userId = await fetch("user/id").then(r => r.json()); // get user id from database

                const { token, error } = await p.signinWithAlias(alias);
                //const token = await p.signinWithId(486761564);

                console.log("Received token", token);
                /**
                 * Verify the sign in - Call your node backend to verify the token created from the sign in
                 */
                const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) => r.json());

                /**
                 * Done - you can now check the user result for status, userid etc
                 */

                console.log("User", user);
              } catch (e) {
                console.error("Things went really bad: ", e);
              }
            }}
            color={'black'}
          >
            Login
          </Button>
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
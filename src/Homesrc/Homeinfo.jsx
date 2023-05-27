import React from 'react'
import { useAddress } from "@thirdweb-dev/react";
import { Flex, Box, Text, Spacer, Heading, SimpleGrid, Image, Link, Center, Button, Input } from '@chakra-ui/react'
import Seller from '../assets/social-media-icons/seller.png'
import Buyer from '../assets/social-media-icons/deal.png'
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
              Register and Choose your role
            </Text>
          </div>
        </Box>
        {address ? (
          <Box>
            <Box>
              <Heading
                fontSize="4xl"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
              >
                Register by wallet:
              </Heading>
              <Button
                margin={'8px'}
                onClick={async function handleRegisterClick(e) {
                  e.preventDefault();
                  const alias = address;
                  // Status("Starting registering...");

                  const p = new Passwordless.Client({
                    apiKey: API_KEY
                  });

                  const backendRequest = await fetch(
                    BACKEND_URL + "/create-token?alias=" + alias
                  );
                  const backendResponse = await backendRequest.json();
                  if (!backendRequest.ok) {
                    alert("It seems that your wallet is registered already.Try to Verify.");
                    return;
                  }
                  const { token, error } = await p.register(backendResponse.token);
                  if (token) {
                    alert("User is registered!,Choose your role");
                  } else {
                    alert("User is not registered!");
                  }
                }}
                color={'black'}
              >
                Register
              </Button>
              <Button
                onClick={async function handleSigninClick(e) {
                  e.preventDefault();
                  const alias = address;
                  const p = new Passwordless.Client({
                    apiKey: API_KEY,
                  });
                  const { token, error } = await p.signinWithAlias(alias);
                  if(error) {
                    alert("Sign in failed, received the error");
                    return;
                  }
                  const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) => r.json());
                  if (user.success === true) {
                    alert("User is logged in!");
                  } else {
                    alert("User is not logged in!", error);
                  }
                }}
                color={'black'}
              >
                Verify
              </Button>
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
                        <Image src={Buyer} h={'300px'}>
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
                        <Image src={Seller} h={'300px'}>
                        </Image>
                      </Center>
                    </Link>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>) : (<Box>
            <Text
              fontSize="3xl"
              letterSpacing="0.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000"
            >
              Please connect your wallet
            </Text>
          </Box>
        )}
      </Flex>
    </Flex >
  )
}

export default MainMint
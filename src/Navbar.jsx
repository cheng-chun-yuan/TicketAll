import React from 'react'
import { useState } from 'react'
import { Box, Flex, Image, Link, Spacer,useDisclosure } from '@chakra-ui/react'
import Facebook from './assets/social-media-icons/facebook_32x32.png'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import Linchiyi from './assets/social-media-icons/email_32x32.png'
import { Button } from '@chakra-ui/react'
import { ConnectWallet,Web3Button,useContract, useContractRead } from '@thirdweb-dev/react';


const Navbar = () => {
  const [showToggler, setShowToggler] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleHover = () => {
    setShowToggler(true);
  };

  const handleLeave = () => {
    setShowToggler(false);
  };
  return (
    <Flex
      className="navbar flex-row"
      justify="space-between" align="center"
      direction="row"
    >
      {/* Left Side - Social Media Icons */}

      <Flex justify="space-around" direction="row">
        <Link href="https://www.facebook.com/profile.php?id=100001337162372" className="items">
          <Image src={Facebook} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://twitter.com/elonmusk" className="items">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://www.facebook.com/profile.php?id=100001337162372" className="items">
          <Image src={Linchiyi} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      {/* Right Side - Section and Connect */}
      <Flex
        justify="space-around"
        align="center"
        className="flex-row"
        padding="30px"
      >
        {/* <Box margin="0 15px" className="items">About</Box> */}
        <Box margin="0 15px" className="items" position="relative">
          <Link href="#" _hover={{ color: "blue" }}>About</Link>
          <Box position="absolute" top="100%" left="50%" transform="translateX(-50%)" backgroundColor="white" padding="10px" borderRadius="5px" boxShadow="md" opacity="0" transition="opacity 0.3s">
            <Link href="#">About Us</Link>
            <Link href="#">Our Vision</Link>
            <Link href="#">Our Mission</Link>
          </Box>
        </Box>
        <Spacer />
        {/* <Box margin="0 15px" className="items">Mint</Box> */}
        <Box margin="0 15px" className="items" position="relative">
          <Link href="#" _hover={{ color: "blue" }}>Mint</Link>
          <Box
            position="absolute"
            top="100%"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="white"
            padding="10px"
            borderRadius="5px"
            boxShadow="md"
            opacity="0"
            transition="opacity 0.3s"
            pointerEvents="none"
          >
            <Link href="#">How to Mint</Link>
            <Link href="#">FAQ</Link>
          </Box>
        </Box>
        <Spacer />
        {/* <Box margin="0 15px" className="items">Team</Box> */}
        <Box margin="0 15px" className="items" position="relative">
          <Link href="#" _hover={{ color: "blue" }}>Team</Link>
          <Box position="absolute" top="100%" left="50%" transform="translateX(-50%)" backgroundColor="white" padding="10px" borderRadius="5px" boxShadow="md" opacity="0" transition="opacity 0.3s">
            <Link href="#">Our Core Team</Link>
            <Link href="#">Advisors</Link>
          </Box>
        </Box>
        <Spacer />

        {/* TODO: 連接錢包 Connect */}
        <ConnectWallet/>
      </Flex>

    </Flex >
  )
}

export default Navbar

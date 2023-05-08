import React from 'react'
import { useState } from 'react'
import { Box, Flex, Image, Link, Spacer } from '@chakra-ui/react'
import Facebook from './assets/social-media-icons/facebook_32x32.png'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import Linchiyi from './assets/social-media-icons/email_32x32.png'
import { Button } from '@chakra-ui/react'
import { ConnectWallet,Web3Button,useContract, useContractRead } from '@thirdweb-dev/react';



    






const Navbar = () => {
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
        <Box margin="0 15px" className="items">About</Box>
        <Spacer />
        <Box margin="0 15px" className="items">Mint</Box>
        <Spacer />
        <Box margin="0 15px" className="items">Team</Box>
        <Spacer />

        {/* TODO: 連接錢包 Connect */}
        <ConnectWallet/>
      </Flex>

    </Flex >
  )
}

export default Navbar
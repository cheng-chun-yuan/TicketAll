import React from 'react'
import {
  Box,
  Flex,
  Image,
  Link,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Heading
} from '@chakra-ui/react'
import Facebook from './assets/social-media-icons/facebook_32x32.png'
import Twitter from './assets/social-media-icons/twitter_32x32.png'
import Linchiyi from './assets/social-media-icons/email_32x32.png'
import Linchielon from './assets/social-media-icons/071.png'
import Cheng from './assets/social-media-icons/cheng.png'
import { Button } from '@chakra-ui/react'
import { ConnectWallet } from '@thirdweb-dev/react';
import { useState } from 'react';

const Navbar = () => {
  const { isOpen, onOpen, onClose} = useDisclosure()
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()
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
        <Link href="https://www.instagram.com/chien_1_/" className="items">
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
        <Box margin="0 15px">
          <Menu isOpen={isOpen}>
            <MenuButton
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "blue"
                }
              }}
            >
              About
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                fontSize={'xl'}
                width={'400px'}
                fontWeight={'bold'}
              >
                <span>
                  We're a NFT ticket company committed to eliminating scalpers and providing a secure way for fans to purchase tickets for events. Our blockchain-powered digital assets ensure authenticity and fair prices, and we work directly with event organizers and artists. Thank you for choosing us for your ticketing needs.
                </span>
              </MenuItem>
            </MenuList>

          </Menu>
        </Box>
        <Spacer />
        {/* <Box margin="0 15px" className="items">Mint</Box> */}
        <Box margin="0 15px">
          <Menu 
            isOpen={isOpen1}
            opacity={'0.8'}
          >
            <MenuButton
              onMouseEnter={onOpen1}
              onMouseLeave={onClose1}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "blue"
                }
              }}
            >
              Mint
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                fontSize={'xl'}
                width={'200px'}
                fontWeight={'bold'}
              >
                <span>
                  Get Mint Authority
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                fontSize={'xl'}
                width={'200px'}
                fontWeight={'bold'}
              >
                <span>
                  Mint NFT Ticket
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                fontSize={'xl'}
                width={'200px'}
                fontWeight={'bold'}
              >
                <span>
                  Q/A
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                fontSize={'xl'}
                width={'200px'}
                fontWeight={'bold'}
              >
                <span>
                  Refund
                </span>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />
        {/* <Box margin="0 15px" className="items">Team</Box> */}
        <Box margin="0 15px">
          <Menu isOpen={isOpen2}>
            
            <MenuButton
              onMouseEnter={onOpen2}
              onMouseLeave={onClose2}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "blue"
                }
              }}
            >
              Team
            </MenuButton>
            <MenuList onMouseEnter={onOpen2} onMouseLeave={onClose2}>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
              >
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src={Cheng}
                  alt='Simon the pensive'
                  mr='12px'
                />
                <span>
                  鄭鈞元
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
                fontFamily="VT323"
                href="https://www.facebook.com/profile.php?id=100001337162372"
              >
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src={Linchielon}
                  alt='Simon the pensive'
                  mr='12px'
                />
                <span>
                  林倩伊
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
              >
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src={Linchiyi}
                  alt='Simon the pensive'
                  mr='12px'
                />
                <span>
                  林倩一
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
              >
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src={Linchiyi}
                  alt='Simon the pensive'
                  mr='12px'
                />
                <span>
                  林倩一
                </span>
              </MenuItem>
              <MenuItem
                minH='30px'
                color={'black'}
              >
                <Image
                  boxSize='2rem'
                  borderRadius='full'
                  src={Linchiyi}
                  alt='Simon the pensive'
                  mr='12px'
                />
                <span>林倩伊</span>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Spacer />

        {/* TODO: 連接錢包 Connect */}
        <ConnectWallet />
      </Flex>

    </Flex >
  )
}

export default Navbar

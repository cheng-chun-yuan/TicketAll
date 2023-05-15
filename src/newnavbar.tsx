import React, { ReactNode } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Image,
    Spacer
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
// import Facebook from './assets/social-media-icons/twitter_32x32'
// import Twitter from './assets/social-media-icons/twitter_32x32.png'
// import Linchiyi from './assets/social-media-icons/email_32x32.png';
// import Linchielon from './assets/social-media-icons/071.png';
// import Cheng from './assets/social-media-icons/cheng.png';
// import Debby from './assets/social-media-icons/Debby.jpg';
import { ConnectWallet } from '@thirdweb-dev/react';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: 'transparent',
        }}
    >
        {children}
    </Link>
);

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3 } = useDisclosure();
    return (
        <>
            <Box
                bg={useColorModeValue('transparent', 'gray.900')}
                px={4}
            >
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        color={'black'}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NavLink>
                                <Menu 
                                    isOpen={isOpen3}
                                >
                                    <MenuButton
                                        onMouseEnter={onOpen3}
                                        onMouseLeave={onClose3}
                                        sx={{
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "transparent",
                                                color: 'blue.400'
                                            }
                                        }}
                                    >
                                        About
                                    </MenuButton>
                                    <MenuList onMouseEnter={onOpen3} onMouseLeave={onClose3}>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                            fontFamily="VT323"
                                            fontSize={'xl'}
                                            width={["100%", "400px"]}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                We're a NFT ticket company committed to eliminating scalpers and providing a secure way for fans to purchase tickets for events. Our blockchain-powered digital assets ensure authenticity and fair prices, and we work directly with event organizers and artists. Thank you for choosing us for your ticketing needs.
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                            <Spacer />
                            <NavLink>
                                <Menu
                                    isOpen={isOpen1}
                                >
                                    <MenuButton
                                        onMouseEnter={onOpen1}
                                        onMouseLeave={onClose1}
                                        sx={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            "&:hover": {
                                                backgroundColor: "transparent",
                                                color: "blue.400"
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
                                            width={["100%", "200px"]}
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
                                            width={["100%", "200px"]}
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
                                            width={["100%", "200px"]}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                Your History
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
                                            width={["100%", "200px"]}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                Refund
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                            <Spacer />
                            <NavLink>
                                <Menu isOpen={isOpen2}>
                                    <MenuButton
                                        onMouseEnter={onOpen2}
                                        onMouseLeave={onClose2}
                                        sx={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            "&:hover": {
                                                color: "blue.400"
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
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Cheng}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                鄭鈞元
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                            fontFamily="VT323"
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchielon}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                林倩伊
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchiyi}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                許聖德
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchiyi}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                陳麒文
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Debby}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                張芳瑜
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <ConnectWallet />
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack 
                            as={'nav'} 
                            spacing={4}
                        >
                            <NavLink>
                                <Menu isOpen={isOpen3}>
                                    <MenuButton
                                        onMouseEnter={onOpen3}
                                        onMouseLeave={onClose3}
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
                                    <MenuList onMouseEnter={onOpen3} onMouseLeave={onClose3}>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                            fontFamily="VT323"
                                            fontSize={'xl'}
                                            width={"200px"}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                We're Anti-Scapler NFT Ticketing Platform
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                            <NavLink>
                                <Menu
                                    isOpen={isOpen1}
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
                                            width={["100%", "200px"]}
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
                                            width={["100%", "200px"]}
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
                                            width={["100%", "200px"]}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                Your History
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
                                            width={["100%", "200px"]}
                                            fontWeight={'bold'}
                                        >
                                            <span>
                                                Refund
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                            <NavLink>
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
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Cheng}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                鄭鈞元
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                            fontFamily="VT323"
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchielon}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                林倩伊
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchiyi}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                許聖德
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Linchiyi}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                陳麒文
                                            </span>
                                        </MenuItem>
                                        <MenuItem
                                            minH='30px'
                                            color={'black'}
                                        >
                                            {/* <Image
                                                boxSize='2rem'
                                                borderRadius='full'
                                                src={Debby}
                                                alt='Simon the pensive'
                                                mr='12px'
                                            /> */}
                                            <span>
                                                張芳瑜
                                            </span>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </NavLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

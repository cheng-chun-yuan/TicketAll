import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Linchielon from "../assets/social-media-icons/071.png";
import Cheng from "../assets/social-media-icons/cheng.png";
import Debby from "../assets/social-media-icons/Debby.jpg";
import Kevin from "../assets/social-media-icons/kevin.png";
import { ConnectWallet } from "@thirdweb-dev/react";

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "transparent",
    }}
  >
    {children}
  </Link>
);
function Backnavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("transparent", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color={"black"}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink>
                <Link href="/concert">back</Link>
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
                        color: "blue.400",
                      },
                    }}
                  >
                    Team
                  </MenuButton>
                  <MenuList onMouseEnter={onOpen2} onMouseLeave={onClose2}>
                    <MenuItem minH="30px" color={"black"} fontFamily="VT323">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Cheng}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>鄭鈞元</span>
                    </MenuItem>
                    <MenuItem minH="30px" color={"black"} fontFamily="VT323">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Linchielon}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>林倩伊</span>
                    </MenuItem>
                    <MenuItem minH="30px" color={"black"}>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Debby}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>張芳瑜</span>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </NavLink>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ConnectWallet />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink>
                <Link href="/concert">back</Link>
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
                        color: "blue.400",
                      },
                    }}
                  >
                    Team
                  </MenuButton>
                  <MenuList onMouseEnter={onOpen2} onMouseLeave={onClose2}>
                    <MenuItem minH="30px" color={"black"} fontFamily="VT323">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Cheng}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>鄭鈞元</span>
                    </MenuItem>
                    <MenuItem minH="30px" color={"black"} fontFamily="VT323">
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Linchielon}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>林倩伊</span>
                    </MenuItem>
                    <MenuItem minH="30px" color={"black"}>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Debby}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>張芳瑜</span>
                    </MenuItem>
                    <MenuItem minH="30px" color={"black"}>
                      <Image
                        boxSize="2rem"
                        borderRadius="full"
                        src={Kevin}
                        alt="Simon the pensive"
                        mr="12px"
                      />
                      <span>林柏呈</span>
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
export default Backnavbar;

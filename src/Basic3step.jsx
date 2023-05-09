import React, { useState } from 'react';
import { useAddress, useContract, Web3Button, useContractRead } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from './const/contractAddress';
import { ethers } from 'ethers';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    Text,
    Spacer,
    Skeleton,
    FormHelperText,
    InputRightElement,
    Card,
    CardBody,
    Checkbox,
    Stack,
    Container
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

const Form1 = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const { contract } = useContract(NFT_ADDRESS)
    const [mintAmount, setMintAmount] = useState(1)
    const [coinAmount, setCoinAmount] = useState(1)
    const address = useAddress()
    const mintprice = (0.001 * mintAmount).toString()
    const [checkedItems, setCheckedItems] = React.useState([false, false])
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const allChecked = checkedItems.every(Boolean)
    // const nowPrice = getAuctionPrice()
    // const mintprice = (nowPrice * mintAmount).toString()
    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }
    const handleDecrement2 = () => {
        if (coinAmount <= 1) return
        setCoinAmount(coinAmount - 1)
    }
    const {
        data: totalNFT,
        isLoading: loadingTotalNFT
    } = useContractRead(contract, 'totalSupply')
    const handleIncrement = () => {
        if (mintAmount >= 8) return
        setMintAmount(mintAmount + 1)
    }
    const handleIncrement2 = () => {
        if (coinAmount >= 4) return
        setCoinAmount(coinAmount + 1)
    }
    return (
        <Box>
            <Heading
                fontSize="30px"
                fontFamily="VT323"
                textShadow="0 1px #D6517D"
                color="#D6517D"
                fontWeight={'bold'}
            >
                Buy Mint Authority!!
            </Heading>
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="20px"
            >
                <Skeleton
                    isLoaded={!loadingTotalNFT}
                >
                    {/* BmT coin: {totalNFT?.toString()} */}
                    BmT coin: 20
                </Skeleton>
            </Box>
            {address ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="10px"
                            marginTop="10px"
                            onClick={handleDecrement2}
                        >
                            -
                        </Button>
                        <Input
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                            value={coinAmount}
                        />
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="10px"
                            marginTop="10px"
                            onClick={handleIncrement2}
                        >
                            +
                        </Button>
                    </Flex>

                    <Web3Button
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            await contract.call('mint', [mintAmount], {
                                value: ethers.utils.parseEther(mintprice)
                            })
                        }}
                        onSuccess={() => {
                            alert('成功囉')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                    >
                        mint authority
                    </Web3Button>
                </div>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    You must be connected to Mint
                </Text>
            )}
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="20px"
            >
                <Skeleton
                    isLoaded={!loadingTotalNFT}
                >
                    {/* Number you can buy : {totalNFT?.toString()} */}
                    Number you can mint : 0
                </Skeleton>
            </Box>
        </Box>
    );
};
const Form2 = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const { contract } = useContract(NFT_ADDRESS)
    const [mintAmount, setMintAmount] = useState(1)
    const [coinAmount, setCoinAmount] = useState(1)
    const address = useAddress()
    const mintprice = (0.001 * mintAmount).toString()
    const [checkedItems, setCheckedItems] = React.useState([false, false])
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const allChecked = checkedItems.every(Boolean)
    // const nowPrice = getAuctionPrice()
    // const mintprice = (nowPrice * mintAmount).toString()
    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }
    const handleDecrement2 = () => {
        if (coinAmount <= 1) return
        setCoinAmount(coinAmount - 1)
    }
    const {
        data: totalNFT,
        isLoading: loadingTotalNFT
    } = useContractRead(contract, 'totalSupply')
    const handleIncrement = () => {
        if (mintAmount >= 8) return
        setMintAmount(mintAmount + 1)
    }
    const handleIncrement2 = () => {
        if (coinAmount >= 4) return
        setCoinAmount(coinAmount + 1)
    }
    return (
        <Box>
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="20px"
            >
                <Skeleton
                    isLoaded={!loadingTotalNFT}
                >
                    Remain nft number: {totalNFT?.toString()}0
                </Skeleton>
            </Box>
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="20px"
            >
                <Skeleton
                    isLoaded={!loadingTotalNFT}
                >
                    AuctionPrice: {totalNFT?.toString()}0000
                </Skeleton>
            </Box>
            {address ? (
                <div>
                    <Flex align="center" justify="center">
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="10px"
                            marginTop="10px"
                            onClick={handleDecrement}
                        >
                            -
                        </Button>
                        <Input
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40px"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number"
                            value={mintAmount}
                        />
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0f0f0f"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="10px"
                            marginTop="10px"
                            onClick={handleIncrement}
                        >
                            +
                        </Button>
                    </Flex>

                    <Web3Button
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            await contract.call('mint', [mintAmount], {
                                value: ethers.utils.parseEther(mintprice)
                            })
                        }}
                        onSuccess={() => {
                            alert('成功囉')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                    >
                        Mint
                    </Web3Button>

                    {/* </Button> */}

                    {/* 目前已賣出 */}
                    <Box
                        fontSize="30px"
                        letterSpacing="0.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000"
                        lineHeight={"26px"}
                        marginTop="20px"
                    >
                        <Skeleton
                            isLoaded={!loadingTotalNFT}
                        >
                            NFT in wallet:{totalNFT?.toString()}
                        </Skeleton>
                    </Box>
                </div>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    You must be connected to Mint
                </Text>
            )}
        </Box>
    );
};

const Form3 = () => {
    return (
        <>
            <Heading
                fontSize="30px"
                fontFamily="VT323"
                textShadow="0 1px #D6517D"
                color="#D6517D"
                fontWeight={'bold'}
            >
                Need some help?
            </Heading>
            <SimpleGrid columns={1} spacing={6}>
                <FormControl as={GridItem} id="email" colSpan={[3, 2]}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Who are you
                    </FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon
                            bg="gray.50"
                            _dark={{
                                bg: 'gray.800',
                            }}
                            color="gray.500"
                            rounded="md">
                            Email
                        </InputLeftAddon>
                        <Input
                            type="tel"
                            placeholder="example : ******@gmail.com"
                            focusBorderColor="brand.400"
                            rounded="md"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        Ask
                    </FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon
                            bg="gray.50"
                            _dark={{
                                bg: 'gray.800',
                            }}
                            color="gray.500"
                            rounded="md">
                            Title
                        </InputLeftAddon>
                        <Input
                            type="tel"
                            placeholder="please describe your qusetion clearly"
                            focusBorderColor="brand.400"
                            rounded="md"
                        />
                    </InputGroup>
                </FormControl>
                <FormControl mt={1}>
                    <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        _dark={{
                            color: 'gray.50',
                        }}>
                        More Detail
                    </FormLabel>
                    <Textarea
                        placeholder="Description for more detail about your questions and problems"
                        rows={3}
                        shadow="sm"
                        focusBorderColor="brand.400"
                        fontSize={{
                            sm: 'sm',
                        }}
                    />
                    <FormHelperText>
                        Be patient! We will reply as soon as possible.
                    </FormHelperText>
                </FormControl>
            </SimpleGrid>
        </>
    );
};
const Form4 = () => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    const { contract } = useContract(NFT_ADDRESS)
    const [mintAmount, setMintAmount] = useState(1)
    const [coinAmount, setCoinAmount] = useState(1)
    const address = useAddress()
    const mintprice = (0.001 * mintAmount).toString()
    const [checkedItems, setCheckedItems] = React.useState([false, false])
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const allChecked = checkedItems.every(Boolean)
    // const nowPrice = getAuctionPrice()
    // const mintprice = (nowPrice * mintAmount).toString()
    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }
    const handleDecrement2 = () => {
        if (coinAmount <= 1) return
        setCoinAmount(coinAmount - 1)
    }
    const {
        data: totalNFT,
        isLoading: loadingTotalNFT
    } = useContractRead(contract, 'totalSupply')
    const handleIncrement = () => {
        if (mintAmount >= 8) return
        setMintAmount(mintAmount + 1)
    }
    const handleIncrement2 = () => {
        if (coinAmount >= 4) return
        setCoinAmount(coinAmount + 1)
    }
    return (
        <Box>
            {address ? (
                <div>
                    <Flex align="center" justify="center">
                        <Text mb='8px'>Value:</Text>
                        <Input
                            width="200px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={value}
                            onChange={handleChange}
                            placeholder='your tokenId'
                            size='sm'
                        />
                    </Flex>
                    <Stack pl={3} mt={1} spacing={1} >
                        <Checkbox
                            isChecked={checkedItems[0]}
                            onChange={(e) => setCheckedItems([e.target.checked, checkedItems[1]])}
                            size='sm'
                            color={'red'}
                        >
                            I agree that I cannot return all money and mint authority when I refund
                        </Checkbox>
                        <Checkbox
                            isChecked={checkedItems[1]}
                            onChange={(e) => setCheckedItems([checkedItems[0], e.target.checked])}
                            size='sm'
                            color={'red'}
                        >
                            I am sure that a want to refund this ticket and take resposibility of my action.
                        </Checkbox>
                    </Stack>
                    <Web3Button
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            await contract.call('burn', [value], {
                                // value: ethers.utils.parseEther(mintprice)
                            })
                        }}
                        onSuccess={() => {
                            alert('成功囉')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                        isDisabled={!allChecked}
                        theme="dark"
                    >
                        Burn
                    </Web3Button>
                </div>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    You must be connected to Mint
                </Text>
            )}

        </Box>
    );
};
export default function multistep() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(25);
    return (
        <>
            <Box
                borderWidth="1px"
                sx={
                    {
                    backgroundColor: "black",
                    opacity:0.85
                    }
                }
                rounded="lg"
                shadow="1px 1px 3px rgba(0,0,0,0.3)"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form">
                <Progress
                    hasStripe
                    value={progress}
                    mb="5%"
                    mx="5%"
                    isAnimated></Progress>
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : <Form4 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 25);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 4}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 4) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 25);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 3 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => {
                                    toast({
                                        title: 'Be Patient',
                                        status: 'success',
                                        description: "We've received your question.",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }}>
                                Q/A
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}
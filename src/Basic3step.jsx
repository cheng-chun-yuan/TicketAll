import React, { useState } from 'react';
import { useAddress, useContract, Web3Button, useContractRead, useContractEvents } from "@thirdweb-dev/react";
import { NFT_ADDRESS, COIN_ADDRESS } from './const/contractAddress';
import Rrfund from './assets/social-media-icons/refund.png'
import Minty from './assets/social-media-icons/mint.png'
import Web3 from 'web3';
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
    SimpleGrid,
    Card, CardBody,
    InputLeftAddon,
    InputGroup,
    Textarea,
    Text,
    Skeleton,
    FormHelperText,
    Checkbox,
    Stack,
    useToast,
    Spacer,
    Tooltip,
    Image,
    Center
} from '@chakra-ui/react';
import dayjs from "dayjs";
import { InfoOutlineIcon } from '@chakra-ui/icons';
const Form1 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const [coinAmount, setCoinAmount] = useState(1)
    const { contract:cointract } = useContract(COIN_ADDRESS)  
    const address = useAddress()
    const handleDecrement2 = () => {
        if (coinAmount <= 1) return
        setCoinAmount(coinAmount - 1)
    }
    const {
        data: numCallOption,
        isLoading: loadingCallOption
    } = useContractRead(contract, "pointBalances", [address])
    const {
        data: numPoint,
        isLoading: loadingPoint
    } = useContractRead(contract, "calculatePoint", [coinAmount, address])
    const {
        data: totalmintA,
        isLoading: loadingtotalmintA
    } = useContractRead(contract, "totalmintAuthority")
    const handleIncrement2 = () => {
        if (coinAmount >= 6) return
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
                    isLoaded={!loadingtotalmintA}
                >
                    CheckBalance (Must>0.05 ETH)
                </Skeleton>
                <Skeleton
                    isLoaded={!loadingtotalmintA}
                >
                    Totalsupply of Mint Authority : {totalmintA?.toString()}
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
                            onChange={(e) => setCoinAmount(e.target.value)}
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
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            padding: "10px",
                            marginBottom: "10px",
                            margin:"10px"
                        }}
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            await cointract.call("approve", [NFT_ADDRESS,100]) 
                            await contract.call('buyCallOption', [coinAmount])
                        }}
                        onSuccess={() => {
                            alert('The transaction has been successfully completed.')
                        }}
                        onError={(error) => {
                            alert('error:' + error.message)
                        }}
                    >
                        Mint Authority
                    </Web3Button>
                    <Skeleton
                        isLoaded={!loadingPoint}
                    >
                        BA token you need  :  {numPoint?.toString()}
                    </Skeleton>
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
            )
            }
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="10px"
            >
                <Skeleton
                    isLoaded={!loadingCallOption}
                >
                    Number you can mint :  {numCallOption?.toString()}
                </Skeleton>
            </Box>
        </Box >
    );
};
const Form2 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const [mintAmount, setMintAmount] = useState(1)
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    const address = useAddress()
    // const nowPrice = getAuctionPrice()
    // const mintprice = (nowPrice * mintAmount).toString()
    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }
    const {
        data: max,
        isLoading: loadingmax
    } = useContractRead(contract, "maxSupply")
    const {
        data: totalNFT,
        isLoading: loadingTotalNFT
    } = useContractRead(contract, 'nowSupply')
    const {
        data: totalNF,
        isLoading: loadingTotalNF
    } = useContractRead(contract, 'balanceOf', [address])
    const {
        data: Auction,
        isLoading: loadingAuction
    } = useContractRead(contract, 'getAuctionPrice')
    const {
        data: rerefund,
        isLoading
    } = useContractRead(contract, 'rerefund')
    const handleIncrement = () => {
        if (mintAmount >= 6) return
        setMintAmount(mintAmount + 1)
    }
    // const Auctioneth = web3.utils.fromWei(Auction, 'ether');
    const BN = web3.utils.BN;
    const Auctioneth = web3.utils.fromWei(new BN(Auction?.toString()), 'ether');

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
                    isLoaded={!loadingTotalNFT || !loadingmax}
                >
                    Remain Amount of NFT : {(max - totalNFT)?.toString()}
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
                {rerefund == 2 ? <Skeleton
                    isLoaded={!loadingAuction}
                >
                    Final Mint <Spacer />AuctionPrice: {Auctioneth} ETH
                </Skeleton> : rerefund == 1 ? <Skeleton
                    isLoaded={!loadingAuction}
                >
                    First Round <Spacer />Auction Price: {Auctioneth} ETH
                </Skeleton> : <Text>Mint not yet</Text>}
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
                            onChange={(e) => setMintAmount(e.target.value)}
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
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            padding: "10px",
                            marginTop: "10px",
                        }}
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            if (rerefund == 1) {
                                await contract.call("auctionmintNFT", [mintAmount], {
                                    value: (mintAmount * Auction).toString(),
                                    from: address,
                                });
                            } else {
                                await contract.call("FinalmintNFT", [mintAmount], {
                                    value: (mintAmount * Auction).toString(),
                                    from: address,
                                });
                            }


                        }}
                        onSuccess={() => {
                            alert('The transaction has been successfully completed.')
                        }}
                        onError={(error) => {
                            alert('error:' + error.message)
                        }}
                        isDisabled={rerefund == 0}
                    >
                        Mint
                    </Web3Button>

                    <Box
                        fontSize="30px"
                        letterSpacing="0.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000"
                        lineHeight={"26px"}
                        marginTop="20px"
                    >
                        <Skeleton
                            isLoaded={!loadingTotalNF}
                        >
                            NFT in wallet:{totalNF?.toString()}
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

const Form5 = () => {
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
                            type="email"
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
                            type="text"
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
const Form3 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    const BN = web3.utils.BN;
    const { data: allEvents, loading: loadingevent } = useContractEvents(contract, "firstmint")
    const { data: allRefund, loading: loadingrefund } = useContractEvents(contract, "Refund")
    const { data: finalMint, loading: loadingmint } = useContractEvents(contract, "finalmint")
    return (
        <Card maxH={'50vh'} overflow={'scroll'}>
            <CardBody>
                <Heading
                    fontFamily="VT323"
                    mb={'20px'}
                    size={'lg'}
                    fontWeight={'bold'}
                >
                    Your History
                </Heading>
                {!loadingevent && !loadingrefund && !loadingmint ?
                    (
                        <Box>
                            {allRefund && allRefund?.map((event, index) => (
                                <Card key={index}>
                                    {event.data.from === address && (
                                        <CardBody>
                                            <Center>
                                                <Flex alignItems={'center'} mb={'10px'}>
                                                    <Image
                                                        src={Rrfund}
                                                        alt='Refund'
                                                        width={30}
                                                        height={30}
                                                        mr={'10px'}
                                                    />
                                                    <Tooltip
                                                        label={`Time:${dayjs.unix(event.data.timestamp)}`}
                                                        bg={'gray.200'}
                                                        color={'black'}
                                                    >
                                                        <InfoOutlineIcon />
                                                    </Tooltip>
                                                    <Text fontWeight={'bold'} mr={'10px'}>
                                                        Refund Token ID: {event.data._tokenId?.toString() ? event.data._tokenId?.toString() : 'no message'}
                                                        <Spacer />
                                                        Amount : {web3.utils.fromWei(new BN(event.data.refundAmount?.toString()), 'ether') ? web3.utils.fromWei(new BN(event.data.refundAmount?.toString()), 'ether') : 'no message'} ETH
                                                    </Text>
                                                </Flex>
                                            </Center>
                                        </CardBody>
                                    )}
                                </Card>
                            ))}
                            {allEvents && allEvents?.map((event, index) => (
                                <Card key={index}>
                                    {event.data.to === address && (
                                        <CardBody>
                                            <Center>
                                                <Flex alignItems={'center'} mb={'10px'}>
                                                    <Image
                                                        src={Minty}
                                                        alt='Mint'
                                                        width={30}
                                                        height={30}
                                                        mr={'10px'}
                                                    />
                                                    <Tooltip
                                                        label={`Time:${dayjs.unix(event.data.timestamp)}`}
                                                        bg={'gray.200'}
                                                        color={'black'}
                                                    >
                                                        <InfoOutlineIcon />
                                                    </Tooltip>
                                                    <Text fontWeight={'bold'} mr={'10px'}>
                                                        firstMint Token ID: {event.data._tokenId?.toString() ? event.data._tokenId?.toString() : 'no message'}
                                                    </Text>
                                                </Flex>
                                            </Center>
                                        </CardBody>
                                    )}
                                </Card>
                            ))}
                            {finalMint && finalMint?.map((event, index) => (
                                <Card key={index}>
                                    {event.data.to === address && (
                                        <CardBody>
                                            <Tooltip
                                                label={`Time:${dayjs.unix(event.data.timestamp)}`}
                                                bg={'gray.200'}
                                                color={'black'}

                                            >
                                                <InfoOutlineIcon />
                                            </Tooltip>
                                            finalMint Token ID: {event.data._tokenId?.toString() ? event.data._tokenId?.toString() : 'no message'}
                                        </CardBody>
                                    )}
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Stack>
                            <Skeleton height={'100px'} />
                            <Skeleton height={'100px'} />
                            <Skeleton height={'100px'} />
                        </Stack>
                    )
                }
            </CardBody>
        </Card>
    );
};
const Form4 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const [checkedItems, setCheckedItems] = React.useState([false, false])
    const [valuee, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const allChecked = checkedItems.every(Boolean)
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
                            value={valuee}
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
                        style={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            padding: "10px",
                            marginTop: "10px",
                        }}
                        contractAddress={NFT_ADDRESS}
                        action={async () => {
                            await contract.call('refund', [valuee], {
                                // value: ethers.utils.parseEther(mintprice)
                            })
                        }}
                        onSuccess={() => {
                            alert('The transaction has been successfully completed.')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                        isDisabled={!allChecked}
                        theme="dark"
                    >
                        Refund
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
                maxWidth={800}
                p={6}
                m="10px auto"
            >
                <Progress
                    value={progress}
                    mb="5%"
                    mx="5%"
                ></Progress>
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : step === 4 ? <Form5 /> : <Form4 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 20);
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
                                isDisabled={step === 5}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 5) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 20);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>
                        {step === 4 ? (
                            <Button
                                w="7rem"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => {
                                    toast({
                                        title: 'Message delivery',
                                        description: "We will reply you as soon as possible",
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }}>
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </Box>
    );
}
// export { Form1, Form2 ,Form3};

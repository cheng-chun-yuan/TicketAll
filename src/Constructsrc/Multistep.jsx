import React, { useState, useEffect } from 'react';
import { useAddress, useContract, Web3Button, useContractRead, useContractEvents } from "@thirdweb-dev/react";
import { NFT_ADDRESS } from '../const/contractAddress';
import RefundIcon from '../assets/social-media-icons/refund.png'
import MintIcon from '../assets/social-media-icons/mint.png'
import Web3 from 'web3';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    Input,
    Card, CardBody,
    Text,
    Skeleton,
    Stack, StackDivider,
    Spacer,
    Tooltip,
    Image,
    Center,
    Icon,
    CardHeader,
} from '@chakra-ui/react';
import dayjs from "dayjs";
import { InfoOutlineIcon } from '@chakra-ui/icons';
const Form4 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const [time, setValue] = React.useState('')
    const [timestep, setTimestep] = React.useState('')
    const [endprice, setEndprice] = React.useState('')
    const [pricestep, setPricestep] = React.useState('')
    const [stepnumber, setStepnumber] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const handleTimestep = (event) => setTimestep(event.target.value)
    const handlePricestep = (event) => setPricestep(event.target.value)
    const handleEndprice = (event) => setEndprice(event.target.value)
    const handleStepnumber = (event) => setStepnumber(event.target.value)
    const address = useAddress()
    const {
        data: owner,
        isLoading: loadingowner
    } = useContractRead(contract, "owner")
    const {
        data: rerefund,
        isLoading: loadingrerefund
    } = useContractRead(contract, 'rerefund')
    return (
        <Box>
            <Heading
                fontSize="30px"
                fontFamily="VT323"
                textShadow="0 1px #D6517D"
                color="#D6517D"
                fontWeight={'bold'}
            >
                Set your auction parameters
            </Heading>
            <Box
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
                marginTop="20px"
            >
                <Box
                    fontSize="30px"
                    letterSpacing="0.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000"
                    lineHeight={"26px"}
                    marginTop="20px"
                >
                    <Skeleton
                        isLoaded={!loadingrerefund}
                    >
                        Now auction mint :{rerefund?.toString()}
                    </Skeleton>
                </Box>
                <Skeleton
                    isLoaded={!loadingowner}
                >
                    {owner == address ? (
                        <Box>
                            <Icon viewBox='0 0 200 200' color='green.500'>
                                <path
                                    fill='currentColor'
                                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                                />
                            </Icon>
                            You are contract owner
                        </Box>
                    ) : (
                        <Box>
                            <Icon viewBox='0 0 200 200' color='red.500'>
                                <path
                                    fill='currentColor'
                                    d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                                />
                            </Icon>
                            You are not contract owner
                        </Box>
                    )}
                </Skeleton>
            </Box>
            {address == owner ? (
                <div>
                    <Flex align="center" justify="center" margin={'4px'}>
                        <Text>Start Time:</Text>
                        <Input
                            width="250px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={time}
                            onChange={handleChange}
                            placeholder='Timestamp'
                            size='sm'
                        />
                    </Flex>
                    <Flex align="center" justify="center" margin={'4px'}>
                        <Text >Time Step:</Text>
                        <Input
                            width="250px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={timestep}
                            onChange={handleTimestep}
                            placeholder='num of steps'
                            size='sm'
                        />
                    </Flex>
                    <Flex align="center" justify="center" margin={'4px'}>
                        <Text >End Price:</Text>
                        <Input
                            width="250px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={endprice}
                            onChange={handleEndprice}
                            placeholder='the final price'
                            size='sm'
                        />
                    </Flex>
                    <Flex align="center" justify="center" margin={'4px'}>
                        <Text>Price Step:</Text>
                        <Input
                            width="250px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={pricestep}
                            onChange={handlePricestep}
                            placeholder='one step price'
                            size='sm'
                        />
                    </Flex>
                    <Flex align="center" justify="center" margin={'4px'}>
                        <Text>Step Number:</Text>
                        <Input
                            width="250px"
                            height="35px"
                            textAlign="center"
                            type="number"
                            value={stepnumber}
                            onChange={handleStepnumber}
                            placeholder='num of steps'
                            size='sm'
                        />
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
                            await contract.call('setAuction', [time, timestep, endprice, pricestep, stepnumber])
                        }}
                        onSuccess={() => {
                            alert('The transaction has been successfully completed.')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                        theme="dark"
                    >
                        SetAuction
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
                    Please change your account to the contract owner
                </Text>
            )
            }
        </Box >
    );
};
const Form5 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const [valuee, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const {
        data: owner,
        isLoading: loadingowner
    } = useContractRead(contract, "owner")
    return (
        <Box>
            {address == owner ? (
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
                            await contract.call('enterTicket', [valuee])
                        }}
                        onSuccess={() => {
                            alert('The transaction has been successfully completed.')
                        }}
                        onError={(error) => {
                            alert(error)
                        }}
                        theme="dark"
                    >
                        Used Ticket
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
                    Please change your account to the contract owner
                </Text>
            )}

        </Box>
    );
};
const Form2 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7')
    const BN = web3.utils.BN;
    const { data: allEvents, loading: loadingevent } = useContractEvents(contract, "firstmint")
    const { data: allRefund, loading: loadingrefund } = useContractEvents(contract, "Refund")
    const { data: finalMint, loading: loadingmint } = useContractEvents(contract, "finalmint")
    const {
        data: owner,
        isLoading: loadingowner
    } = useContractRead(contract, "owner")
    return (
        <>
            {address == owner ? (
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
                                            <CardBody>
                                                <Center>
                                                    <Flex alignItems={'center'} mb={'10px'}>
                                                        <Image
                                                            src={RefundIcon}
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
                                        </Card>
                                    ))}
                                    {allEvents && allEvents?.map((event, index) => (
                                        <Card key={index}>
                                            <CardBody>
                                                <Center>
                                                    <Flex alignItems={'center'} mb={'10px'}>
                                                        <Image
                                                            src={MintIcon}
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
                                        </Card>
                                    ))}
                                    {finalMint && finalMint?.map((event, index) => (
                                        <Card key={index}>
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
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    Please change your account to the contract owner
                </Text>
            )}
        </>
    );
};
const Form3 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const [messageData, setMessageData] = useState([]);
    const {
        data: owner,
        isLoading: loadingowner
    } = useContractRead(contract, "owner")
    useEffect(() => {
        axios.get(BACKEND_URL + '/api/messages')
            .then((response) => {
                setMessageData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {address == owner ? (
                <Card maxH={'50vh'} overflow={'scroll'}>
                    <CardHeader>
                        <Heading
                            fontFamily="VT323"
                            size={'lg'}
                            fontWeight={'bold'}
                        >
                            Message List
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                {messageData.map((message, index) => (
                                    <Card key={index} margin={5} bg={'blue.100'}>
                                        <Tooltip
                                            margin={'10px'}
                                            label={`Address:${message.address}`}
                                            bg={'gray.200'}
                                            color={'black'}
                                        >
                                            <InfoOutlineIcon />
                                        </Tooltip>
                                        <Center>

                                            <Flex alignItems={"start"} >
                                                <Text fontWeight={'bold'} fontSize={'xs'}>
                                                    Email: {message.email}
                                                    <Spacer />
                                                    Title: {message.title}
                                                    <Spacer />
                                                    Detail: {message.description}
                                                </Text>
                                            </Flex>
                                        </Center>
                                    </Card>
                                ))}
                            </Box>
                        </Stack>
                    </CardBody>
                </Card>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    Please change your account to the contract owner
                </Text>
            )}
        </>
    );
};
const Form1 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const [data, setData] = useState('No result');
    console.log(data);
    const buy_address = data.substring(0, 42);
    const tokenId = data.substring(42);
    const {
        data: owner,
        isLoading
    } = useContractRead(contract, "owner")
    const {
        data: ownerOf,
        isLoading: loadingownerOf
    } = useContractRead(contract, "ownerOf", [tokenId])
    const handleScan = (result, error) => {
        if (result) {
            setData(result.text);
        }

        if (error) {
            console.error(error);
        }
    };
    const YourComponent = () => {
        // Define a function to handle the NFT transaction
        const handleNFTTransaction = async () => {
            try {
                await contract.call('enterTicket', [tokenId]);
                alert('The transaction has been successfully completed.');
            } catch (error) {
                alert(error);
            }
        };

        // Use the useEffect hook to automatically execute the code
        useEffect(() => {
            handleNFTTransaction();
        }, []); // The empty dependency array ensures the effect runs only once
        return null;
    };
    const count = 0;
    return (
        <Box>
            <Heading
                fontSize="30px"
                fontFamily="VT323"
                textShadow="0 1px #D6517D"
                color="#D6517D"
                fontWeight={'bold'}
            >
                Scan Ticket
            </Heading>
            {address == owner ? (
                <>
                    <QrReader
                        onResult={handleScan}
                        style={{ width: '100%' }}
                        scanDelay={50}
                    />
                    {buy_address == ownerOf ? (
                        <>

                            <p>TokenId : {tokenId}</p>
                            <YourComponent />
                        </>
                    ) : (
                        <p>No Result</p>
                    )}
                </>
            ) : (
                <Text
                    marginTop="70px"
                    fontSize="30px"
                    letterSpacing="-5.5%"
                    fontFamily="VT323"
                    textShadow="0 3px #000"
                    color="#D6517D"
                >
                    Please change your account to the contract owner
                </Text>
            )
            }
        </Box>
    );
};
function multistep() {
    const { contract } = useContract(NFT_ADDRESS);
    const address = useAddress();
    const {
        data: owner,
        isLoading
    } = useContractRead(contract, "owner")
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
                                mr="5%"
                            >
                                Back
                            </Button>
                            <Button
                                w="7rem"
                                isDisabled={step === 4 || address != owner}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 3) {
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
                    </Flex>
                </ButtonGroup>
            </Box>
        </Box>
    );
}
export default multistep;

import { useAddress, useContract, Web3Button, useContractRead, useContractEvents, useNFT } from "@thirdweb-dev/react";
import { NFT_ADDRESS, BA_ADDRESS, STAKING_ADDRESS } from '../const/contractAddress';
import RefundIcon from '../assets/social-media-icons/refund.png'
import MintIcon from '../assets/social-media-icons/mint.png'
import Web3 from 'web3';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { QRCodeCanvas } from "qrcode.react";
import AES from 'crypto-js/aes';
import contractABI from '../contractABI.json'; // Replace with your ERC721 contract ABI
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
    Center,
    Icon
} from '@chakra-ui/react';
import dayjs from "dayjs";
import { InfoOutlineIcon } from '@chakra-ui/icons';
const Form1 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    const [coinAmount, setCoinAmount] = useState(1)
    const { contract: BA_contract } = useContract(BA_ADDRESS)
    const address = useAddress()
    const handleDecrement2 = () => {
        if (coinAmount <= 1) return
        setCoinAmount(coinAmount - 1)
    }
    const {
        data: totalNF,
        isLoading: loadingTotalNF
    } = useContractRead(contract, 'balanceOf', [address])
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
    const {
        data: check,
        isLoading: loadingcheck
    } = useContractRead(contract, "check", [address])
    const remainAmount = 6 - totalNF - numCallOption
    const handleIncrement2 = () => {
        if (coinAmount >= remainAmount) return
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
                    isLoaded={!loadingcheck}
                >
                    {check ? (
                        <Icon viewBox='0 0 200 200' color='green.500'>
                            <path
                                fill='currentColor'
                                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                            />
                        </Icon>
                    ) : (
                        <Icon viewBox='0 0 200 200' color='red.500'>
                            <path
                                fill='currentColor'
                                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                            />
                        </Icon>
                    )}

                    CheckBalance (Must{'>'}0.05 ETH)
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
                            margin: "10px"
                        }}
                        contractAddress={NFT_ADDRESS}
                        action={async function handleSigninClick(e) {
                            const alias = address;
                            const p = new Passwordless.Client({
                                apiKey: API_KEY,
                            });
                            const backendRequest = await fetch(
                                BACKEND_URL + "/create-token?alias=" + alias
                            );
                            const backendResponse = await backendRequest.json();
                            try { await p.register(backendResponse.token); }
                            catch (error) { console.log(error) }
                            const { token, error } = await p.signinWithAlias(address);
                            // console.log("Received token", token);
                            const response = await fetch(BACKEND_URL + "/verify-signin?token=" + token);
                            if (response.ok) {
                                // Continue with the next steps
                                try {
                                    await BA_contract.call("approve", [NFT_ADDRESS, numPoint])
                                } catch (error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: "Transaction failed",
                                    })
                                    return;
                                }
                                try {
                                    await contract.call('buyCallOption', [coinAmount]);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Transaction successfully!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                } catch (error) {
                                    Swal.fire({
                                        icon: 'error',
                                        title: "An error occurred while sending the transaction",
                                    });
                                }
                            } else {
                                // Break or handle the failure case
                                Swal.fire({
                                    icon: 'error',
                                    title: "Identity verification failed",
                                })
                                return;
                            }
                        }}
                        isDisabled={remainAmount === 0}
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
    const [mintAmountA, setMintAmountA] = useState(0)
    const [mintAmountB, setMintAmountB] = useState(0)
    const [mintAmountC, setMintAmountC] = useState(0)
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    const address = useAddress()
    const { 
        data: lock,
        isLoading: loadinglock 
    } = useContractRead(contract, "lock");
    const {
        data: maxSupplyA,
        isLoading: loadingmaxSupplyA
    } = useContractRead(contract, "maxSupplyA")
    const {
        data: totalNFTA,
        isLoading: loadingTotalNFTA
    } = useContractRead(contract, 'nowSupplyA')
    const {
        data: maxSupplyB,
        isLoading: loadingmaxSupplyB
    } = useContractRead(contract, "maxSupplyB")
    const {
        data: totalNFTB,
        isLoading: loadingTotalNFTB
    } = useContractRead(contract, 'nowSupplyB')
    const {
        data: maxSupplyC,
        isLoading: loadingmaxSupplyC
    } = useContractRead(contract, "maxSupplyC")
    const {
        data: totalNFTC,
        isLoading: loadingTotalNFTC
    } = useContractRead(contract, 'nowSupplyC')
    const {
        data: totalNF,
        isLoading: loadingTotalNF
    } = useContractRead(contract, 'balanceOf', [address])
    const {
        data: Auction,
        isLoading: loadingAuction
    } = useContractRead(contract, 'getAuctionPrice')
    const handleDecrementA = () => {
        if (mintAmountA <= 0) return
        setMintAmountA(mintAmountA - 1)
    }
    const handleIncrementA = () => {
        if (mintAmountA + mintAmountB +mintAmountC >= 6 - totalNF) return
        setMintAmountA(mintAmountA + 1)
    }
    const handleDecrementB = () => {
        if (mintAmountB <= 0) return
        setMintAmountB(mintAmountB - 1)
    }
    const handleIncrementB = () => {
        if (mintAmountA + mintAmountB +mintAmountC >= 6 - totalNF) return
        setMintAmountB(mintAmountB + 1)
    }
    const handleDecrementC = () => {
        if (mintAmountC <= 0) return
        setMintAmountC(mintAmountC - 1)
    }
    const handleIncrementC = () => {
        if (mintAmountA + mintAmountB +mintAmountC >= 6 - totalNF) return
        setMintAmountC(mintAmountC + 1)
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
                    isLoaded={!loadingTotalNFTA && !loadingmaxSupplyA && !loadingTotalNFTB && !loadingmaxSupplyB && !loadingTotalNFTC && !loadingmaxSupplyC}
                >
                    Remain Amount of A : {(maxSupplyA - totalNFTA)?.toString()}
                    <Spacer/>
                    Remain Amount of B : {(maxSupplyB - totalNFTB)?.toString()}
                    <Spacer/>
                    Remain Amount of C : {(maxSupplyC - totalNFTC)?.toString()}
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
                {lock ?(
                    <Skeleton
                        isLoaded={!loadingAuction}
                    >
                        First Round <Spacer />Auction Price: {Auctioneth} ETH
                    </Skeleton>
                ):( 
                    <Text>Mint not yet</Text>
                )}
            </Box>
            {address ? (
                <div>
                    <Center>
                        <Flex align="center" justify="center">
                            
                            <InputGroup>
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0f0f0f"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="10px"
                                    marginTop="10px"
                                    onClick={handleDecrementA}
                                >
                                    -
                                </Button>
                                <InputLeftAddon 
                                    children='A:' 
                                    fontFamily="inherit"
                                    width="60px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    color='black'
                                />
                                <Input
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    type="number"
                                    value={mintAmountA}
                                    onChange={(e) => setMintAmountA(e.target.value)}
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
                                    onClick={handleIncrementA}
                                >
                                    +
                                </Button>
                            </InputGroup>
                            
                        </Flex>
                    </Center>
                    <Center>
                        <Flex align="center" justify="center">
                            
                            <InputGroup>
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0f0f0f"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="10px"
                                    marginTop="10px"
                                    onClick={handleDecrementB}
                                >
                                    -
                                </Button>
                                <InputLeftAddon 
                                    children='B:' 
                                    fontFamily="inherit"
                                    width="60px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    color='black'
                                />
                                <Input
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    type="number"
                                    value={mintAmountB}
                                    onChange={(e) => setMintAmountB(e.target.value)}
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
                                    onClick={handleIncrementB}
                                >
                                    +
                                </Button>
                            </InputGroup>
                            
                        </Flex>
                    </Center>
                    <Center>
                        <Flex align="center" justify="center">
                            <InputGroup>
                                <Button
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0f0f0f"
                                    color="white"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="10px"
                                    marginTop="10px"
                                    onClick={handleDecrementC}
                                >
                                    -
                                </Button>
                                <InputLeftAddon 
                                    children='C:' 
                                    fontFamily="inherit"
                                    width="60px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    color='black'
                                />
                                <Input
                                    readOnly
                                    fontFamily="inherit"
                                    width="100px"
                                    height="40px"
                                    textAlign="center"
                                    paddingLeft="19px"
                                    marginTop="10px"
                                    type="number"
                                    value={mintAmountC}
                                    onChange={(e) => setMintAmountC(e.target.value)}
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
                                    onClick={handleIncrementC}
                                >
                                    +
                                </Button>
                            </InputGroup>
                            
                        </Flex>
                    </Center>
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
                            await contract.call("mintNFT", [mintAmountA,mintAmountB,mintAmountC], {
                                value: ( (3*mintAmountA + 2*mintAmountB + mintAmountC)* Auction).toString(),
                                from: address,
                            });
                        }}
                        onSuccess={() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'NFT has been successfully minted',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }}
                        onError={() => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Mint failed',
                            })
                        }}
                        isDisabled={!lock}
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
const Form3 = () => {
    const { contract } = useContract(NFT_ADDRESS)
    // const { contract:st_contract } = useContract(STAKING_ADDRESS)
    const address = useAddress()
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    const BN = web3.utils.BN;
    const { data: allEvents, loading: loadingevent } = useContractEvents(contract, "firstmint")
    const { data: allRefund, loading: loadingrefund } = useContractEvents(contract, "Refund")
    const { data: finalMint, loading: loadingmint } = useContractEvents(contract, "finalmint")
    // const { data: stake, loading: loadingstake } = useContractEvents(st_contract, "NFTStaked")
    // const { data: unstake, loading: loadingunstake } = useContractEvents(st_contract, "NFTUnstaked")
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
    const [nfts, setNFTs] = useState([]);
    const address = useAddress();
    // const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    // const contract = new web3.eth.Contract(contractABI, NFT_ADDRESS);
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const { contract } = useContract(NFT_ADDRESS)
    const {
        data: nowSupply,
        isLoading: loadingnowSupply
    } = useContractRead(contract, "nowSupply")

    useEffect(() => {
        const fetchOwnedNFTs = async () => {
            const tokenIds = [];
            for (let i = 1; i <= nowSupply; i++) {
                try {
                    const data = await contract.call("ownerOf", [i]);
                    if (data === address) {
                        tokenIds.push(i);
                    }
                } catch (error) {
                    // Handle the revert error here
                    continue; // Continue to the next iteration of the loop
                }
            }
            // const tokenIds = await contract.methods.stakeOfOwner(address,1).call();
            // const tokenIds = [1, 2];
            // Fetch the metadata for each token ID and update the state
            const fetchedNFTs = await Promise.all(
                tokenIds.map(async (tokenId) => {
                    const nftMetadata = await fetchNFTMetadata(tokenId); // Implement this function to fetch the metadata
                    return {
                        tokenId,
                        metadata: nftMetadata,
                    };
                })
            );
            setNFTs(fetchedNFTs);
        };

        fetchOwnedNFTs();
    }, []);
    // Fetch the NFT metadata using the token ID
    async function fetchNFTMetadata(tokenId) {
        // Implement your logic to fetch the metadata (e.g., from IPFS, a centralized server, or a blockchain query)
        // For this example, let's assume the metadata is stored in a JSON file on Pinata

        const pinataUrl = await contract.call("tokenURI", [tokenId]);
        try {
            const response = await fetch(pinataUrl);
            const data = await response.json();

            // Return an object containing the relevant metadata
            return {
                name: data.name,
                image: data.image,
            };
        } catch (error) {
            console.error('Error fetching NFT metadata:', error);
            // Handle the error appropriately (e.g., return an error object or throw an exception)
        }
    }
    return (
        <Box>
            {showMore ? (
                <Card maxH={'50vh'} overflow={'scroll'}>
                    <CardBody>
                        <Heading
                            fontFamily="VT323"
                            mb={'20px'}
                            size={'lg'}
                            fontWeight={'bold'}
                        >
                            Your Owned NFTs
                        </Heading>
                        <Box>
                            <Card>
                                {nfts.map((nft) => (
                                    <Box key={nft.tokenId}>
                                        <Text>{nft.metadata.name}:{nft.tokenId}</Text>
                                        <Center>
                                            <Image src={nft.metadata.image} alt={nft.metadata.name} h={'150px'} margin={'20px'} />
                                            {nft.metadata.name == 'Ticket' &&
                                                <QRCodeCanvas
                                                    id="qrCode"
                                                    value={AES.encrypt((address + nft.tokenId)?.toString(), "secret_key").toString()}
                                                    height={150}
                                                    margin={'20px'}
                                                />
                                            }
                                        </Center>
                                    </Box>
                                ))}
                            </Card>
                        </Box>
                    </CardBody>
                </Card>) : (
                <Button
                    onClick={async function handleSigninClick(e) {
                        e.preventDefault();
                        const alias = address;
                        const p = new Passwordless.Client({
                            apiKey: API_KEY,
                        });
                        const { token, error } = await p.signinWithAlias(alias);
                        if (error) {
                            Swal.fire({
                                icon: 'error',
                                title: "Sign in failed",
                            });
                            return;
                        }
                        const user = await fetch(BACKEND_URL + "/verify-signin?token=" + token).then((r) => r.json());
                        if (user.success === true) {
                            toggleShowMore();
                            Swal.fire({
                                icon: 'success',
                                title: 'User is logged in successfully!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "User is not logged in!",
                            });
                        }
                    }}
                    color={'black'}
                >
                    Show NFT
                </Button>
            )}

        </Box>
    );
};
const Form5 = () => {
    const address = useAddress();
    const toast = useToast();
    const [email, setDataObject1] = useState('');
    const [title, setDataObject2] = useState('');
    const [description, setDataObject3] = useState('');
    const handleSubmit = async () => {
        try {
            // Perform the first API request
            if (email === '' || title === '' || description === '') {
                toast({
                    title: 'Error',
                    description: 'please fill in the form.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            };
            const response = await axios.post(BACKEND_URL + '/api/submit', {
                address: address,
                email: email,
                title: title,
                description: description
            });
            toast({
                title: 'Data Submitted',
                description: 'Your data has been successfully submitted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setDataObject1('');
            setDataObject2('');
            setDataObject3('');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'An error occurred while submitting the data.' + error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };
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
                            value={email}
                            onChange={(e) => setDataObject1(e.target.value)}
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
                            value={title}
                            onChange={(e) => setDataObject2(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDataObject3(e.target.value)}
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
            <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleSubmit}
                marginTop={'20px'}
            >
                Submit
            </Button>
        </>
    );
};
const Form6 = () => {
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
                            I am sure that I want to refund this ticket and take resposibility of my action.
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
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your NFT has been refunded',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }}
                        onError={(error) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'An error occurred while sending the transaction',
                            })
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
function multistep() {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(16.7);
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
                {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : step === 3 ? <Form3 /> : step === 4 ? <Form4 /> : step === 5 ? <Form5 /> : <Form6 />}
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 16.6);
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
                                isDisabled={step === 6}
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 5) {
                                        setProgress(100);
                                    } else {
                                        setProgress(progress + 16.6);
                                    }
                                }}
                                colorScheme="teal"
                                variant={"outline"}
                            >
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

import Token from '../assets/social-media-icons/black.png';
import NFT from '../assets/social-media-icons/nft.png';
import React from 'react';
import { useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { STAKING_ADDRESS, BMT_ADDRESS, NFT_ADDRESS } from '../const/contractAddress';
import {
    Box,
    Heading,
    Input,
    Text,
    Spacer,
    Image,
    Center,
    Skeleton,
    SimpleGrid,
} from '@chakra-ui/react';

function InStake() {
    const { contract } = useContract(STAKING_ADDRESS)
    const { contract: BMTcontract } = useContract(BMT_ADDRESS)
    const { contract: NFTcontract } = useContract(NFT_ADDRESS)
    const address = useAddress()
    const [value, setValue] = React.useState('')
    const [valuee, setValuee] = React.useState('')
    const handleCoin = (event) => setValuee(event.target.value)
    const handleNFT = (event) => setValue(event.target.value)
    const {
        data: numStake,
        isLoading: loadingnumStake
    } = useContractRead(contract, "stakes", [address])
    const {
        data: totalStaked,
        isLoading: loadingtotalStaked
    } = useContractRead(contract, "totalStaked")
    const {
        data: Stakes,
        isLoading: loadingStakes
    } = useContractRead(contract, "nftstakes", [address])
    const {
        data: onedayReward,
        isLoading: loadingonedayReward
    } = useContractRead(contract, "onedayReward", [address])
    const {
        data: Reward,
        isLoading: loadingReward
    } = useContractRead(contract, "calculateReward", [address])
    return (
        <Box>
            <Box>
                <Center>
                    <SimpleGrid columns={2} spacing={10}>
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
                            <Heading
                                fontSize="4xl"
                                color={'pink.300'}
                                fontFamily="VT323"
                                textShadow="0 2px 2px #000"
                            >
                                Coin Staking Pool
                            </Heading>
                            <Center>
                                <Image src={Token} h={'250px'}></Image>
                            </Center>
                            {address ? (
                                <div>
                                    <Text
                                        fontSize="3xl"
                                        letterSpacing="0.5%"
                                        fontFamily="VT323"
                                        textShadow="0 2px 2px #000"
                                    >
                                        Stake : BmT token
                                        <Spacer />
                                        Earn : BA token
                                    </Text>
                                    <Input
                                        width="150px"
                                        height="35px"
                                        textAlign="center"
                                        type="number"
                                        value={valuee}
                                        onChange={handleCoin}
                                        placeholder='Amount'
                                        size='sm'
                                        margin={'10px'}
                                    />
                                    <Spacer />
                                    <Web3Button
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "5px",
                                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                            padding: "10px",
                                            marginTop: "10px",
                                            margin: "10px"
                                        }}
                                        contractAddress={STAKING_ADDRESS}
                                        action={async () => {
                                            await BMTcontract.call("approve", [STAKING_ADDRESS, valuee])
                                            await contract.call('stake', [valuee])
                                        }}
                                        onSuccess={() => {
                                            alert('The transaction has been successfully completed.')
                                        }}
                                        onError={(error) => {
                                            alert(error)
                                        }}
                                        theme="dark"
                                    >
                                        Stake
                                    </Web3Button>
                                    <Web3Button
                                        style={{
                                            borderRadius: "5px",
                                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                            padding: "10px",
                                            marginTop: "10px",
                                            margin: "10px"
                                        }}
                                        contractAddress={STAKING_ADDRESS}
                                        action={async () => {
                                            await contract.call('unstake', [valuee], {
                                                // value: ethers.utils.parseEther(mintprice)
                                            })
                                        }}
                                        onSuccess={() => {
                                            alert('The transaction has been successfully completed.')
                                        }}
                                        onError={(error) => {
                                            alert(error)
                                        }}
                                        theme="light"
                                    >
                                        Unstake
                                    </Web3Button>
                                    <Text
                                        fontSize="3xl"
                                        letterSpacing="0.5%"
                                        fontFamily="VT323"
                                        textShadow="0 2px 2px #000"
                                    >

                                        <Skeleton
                                            isLoaded={!loadingnumStake}
                                        >
                                            My Staking BmT :  {numStake?.toString()}
                                        </Skeleton>
                                        <Spacer />
                                        <Skeleton
                                            isLoaded={!loadingtotalStaked}
                                        >
                                            Total Staking BmT :  {totalStaked?.toString()}
                                        </Skeleton>
                                    </Text>
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
                            <Heading
                                fontSize="4xl"
                                color={'pink.300'}
                                fontFamily="VT323"
                                textShadow="0 2px 2px #000"
                            >
                                NFT Staking Pool
                            </Heading>
                            <Center>
                                <Image src={NFT} h={'250px'}></Image>
                            </Center>
                            {address ? (
                                <div>
                                    <Text
                                        fontSize="3xl"
                                        letterSpacing="0.5%"
                                        fontFamily="VT323"
                                        textShadow="0 2px 2px #000"
                                    >
                                        Stake : Memorial Ticket
                                        <Spacer />
                                        Earn : BA token
                                    </Text>
                                    <Input
                                        width="150px"
                                        height="35px"
                                        textAlign="center"
                                        type="number"
                                        value={value}
                                        onChange={handleNFT}
                                        placeholder='tokenId'
                                        size='sm'
                                        margin={'10px'}
                                    />
                                    <Spacer />
                                    <Web3Button
                                        style={{
                                            backgroundColor: "white",
                                            borderRadius: "5px",
                                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                            padding: "10px",
                                            marginTop: "10px",
                                            margin: "10px"
                                        }}
                                        contractAddress={STAKING_ADDRESS}
                                        action={async () => {
                                            // await NFTcontract.call("setOnStaking", [value])
                                            // await NFTcontract.call("approve", [STAKING_ADDRESS, value])
                                            await contract.call('stakeNFT', [value])
                                        }}
                                        onSuccess={() => {
                                            alert('The transaction has been successfully completed.')
                                        }}
                                        onError={(error) => {
                                            alert(error)
                                        }}
                                        theme="dark"
                                    >
                                        NFTStake
                                    </Web3Button>
                                    <Web3Button
                                        style={{
                                            borderRadius: "5px",
                                            boxShadow: "0px 2px 2px 1px #0f0f0f",
                                            cursor: "pointer",
                                            fontFamily: "inherit",
                                            padding: "10px",
                                            marginTop: "10px",
                                            margin: "10px"
                                        }}
                                        contractAddress={STAKING_ADDRESS}
                                        action={async () => {
                                            // await NFTcontract.call("resetOnStaking", [value])
                                            await contract.call('unstakeNFT', [value])
                                        }}
                                        onSuccess={() => {
                                            alert('The transaction has been successfully completed.')
                                        }}
                                        onError={(error) => {
                                            alert(error)
                                        }}
                                        theme="light"
                                    >
                                        Unstake
                                    </Web3Button>
                                    <Text
                                        fontSize="3xl"
                                        letterSpacing="0.5%"
                                        fontFamily="VT323"
                                        textShadow="0 2px 2px #000"
                                    >

                                        <Skeleton
                                            isLoaded={!loadingStakes}
                                        >
                                            My Staking NFT :  {Stakes?.toString()}
                                        </Skeleton>
                                        <Spacer />
                                        <Skeleton
                                            isLoaded={!loadingStakes}
                                        >
                                            Total Staking NFT :  {Stakes?.toString()}
                                        </Skeleton>
                                    </Text>
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

                    </SimpleGrid>

                </Center>
            </Box>
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
                maxWidth={300}
                p={6}
                m="10px auto"
            >
                {address ? (
                    <div>
                        <Text
                            fontSize="3xl"
                            letterSpacing="0.5%"
                            fontFamily="VT323"
                            textShadow="0 2px 2px #000"
                        >
                            <Skeleton
                                isLoaded={!loadingonedayReward}
                            >
                                Reward per Day:  {onedayReward?.toString()}
                            </Skeleton>
                            <Spacer />
                            <Skeleton
                                isLoaded={!loadingReward}
                            >
                                Claim:  {Reward?.toString()}
                            </Skeleton>
                        </Text>
                        <Web3Button
                            style={{
                                backgroundColor: "pink",
                                borderRadius: "5px",
                                boxShadow: "0px 2px 2px 1px #0f0f0f",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                padding: "10px",
                                marginTop: "10px",
                                margin: "10px"
                            }}
                            contractAddress={STAKING_ADDRESS}
                            action={async () => {
                                await contract.call('claimReward')
                            }}
                            onSuccess={() => {
                                alert('The transaction has been successfully completed.')
                            }}
                            onError={(error) => {
                                alert(error)
                            }}
                            theme="dark"
                        >
                            Claim
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
        </Box>
    );
}
export default InStake;
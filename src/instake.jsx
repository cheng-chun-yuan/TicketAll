import Token from './assets/social-media-icons/trans.png';
import React from 'react';
import { useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import { STAKING_ADDRESS } from './const/contractAddress';
import {
    Box,
    Button,
    Heading,
    Flex,
    Input,
    Text,
    Checkbox,
    Stack,
    Spacer,
    Image,
    Center,
    Skeleton,
} from '@chakra-ui/react';

export default function InStake() {
    const { contract } = useContract(STAKING_ADDRESS)
    const address = useAddress()
    const [valuee, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    const {
        data: numStake,
        isLoading: loadingnumStake
    } = useContractRead(contract, "stakes", [address])
    const {
        data: totalStaked,
        isLoading: loadingtotalStaked
    } = useContractRead(contract, "totalStaked")
    const {
        data: Reward,
        isLoading: loadingReward
    } = useContractRead(contract, "calculateReward", [address])
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
                    Staking Pool
                </Heading>
                <Center>
                    <Image src={Token} w={'350px'}></Image>
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
                            onChange={handleChange}
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
                                await contract.call('stake', [valuee], {
                                    // value: ethers.utils.parseEther(mintprice)
                                })
                            }}
                            onSuccess={() => {
                                alert('成功囉')
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
                                alert('成功囉')
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
                                await contract.call('claim')
                            }}
                            onSuccess={() => {
                                alert('成功囉')
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
const Form4 = () => {
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
                            alert('成功囉')
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
import React from 'react'
import { Flex, Box, Text, Button, Input, Spacer, Skeleton, Center } from '@chakra-ui/react'
import { useState } from 'react'
import { useAddress, Web3Button, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from 'ethers'
import { NFT_ADDRESS } from './const/contractAddress';

const MainMint = () => {
    const [mintAmount, setMintAmount] = useState(1)
    const address = useAddress();

    const { contract } = useContract(NFT_ADDRESS)

    const handleDecrement = () => {
        if (mintAmount <= 1) return
        setMintAmount(mintAmount - 1)
    }

    const handleIncrement = () => {
        if (mintAmount >= 3) return
        setMintAmount(mintAmount + 1)
    }

    const {
        data: totalSupply,
        isLoadong: loadingTotalSupply
    } = useContractRead(contract, 'totalSupply')

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
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
                                padding="15px"
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
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}
                            >
                                +
                            </Button>
                        </Flex>

                        <Web3Button
                            contractAddress={NFT_ADDRESS}
                            action={async () => {
                                await contract.call('mint', [mintAmount], { value: ethers.utils.parseEther('0.001') })
                            }}
                        >
                            Mint Now
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
        </Flex >
    )
}

export default MainMint
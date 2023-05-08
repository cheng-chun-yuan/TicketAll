import React from 'react'
import { Flex, Box, Text, Button, Input, Spacer,Skeleton,Card,CardBody,Heading, SimpleGrid,Checkbox,Stack} from '@chakra-ui/react'
import { useState } from 'react'
import { useAddress ,useContract,Web3Button,useContractRead} from "@thirdweb-dev/react";
import { NFT_ADDRESS } from './const/contractAddress';
import { ethers } from 'ethers';

const MainMint = () => {
  const {contract} = useContract(NFT_ADDRESS)
  const [mintAmount, setMintAmount] = useState(1)
  const [coinAmount, setCoinAmount] = useState(1)
  const address = useAddress()
  const mintprice = (0.001*mintAmount).toString()
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
    data:totalNFT,
    isLoading:loadingTotalNFT
  } = useContractRead(contract,'totalSupply')

  const handleIncrement = () => {
    if (mintAmount >= 8) return
    setMintAmount(mintAmount + 1)
  }
  const handleIncrement2 = () => {
    if (coinAmount >= 4) return
    setCoinAmount(coinAmount + 1)
  }

  return (
    <Flex justify="center" align="center" paddingBottom="150px">
      <Flex
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        py={'20px'}
        flexDirection={'column'}
      >
        <Box>
        <div className="mint-container">
              <Text fontSize="40px" textShadow="0 5px #000">Buymeticket</Text>
              <Text
                fontSize="30px"
                letterSpacing="0.5%"
                fontFamily="VT323"
                textShadow="0 2px 2px #000"
                lineHeight={"26px"}
              >
                <Text>
                I hate yellow bull.
                </Text>
                Our mission is to ensure that all fan can buy a ticket at fair price.
              </Text>
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
                  action={async() => {
                    await contract.call('mint',[mintAmount],{
                        value: ethers.utils.parseEther(mintprice)
                    })
                  }}
                  onSuccess={() =>{
                    alert('成功囉')
                  }}
                  onError={(error) =>{
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
              
              <Spacer />


            </div>
        </Box>
        <SimpleGrid
          columns={3}
          spacing={10}
          mt={'100px'}
          w={'100%'}
        >
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
                remain nft number: {totalNFT?.toString()}0
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
                  action={async() => {
                    await contract.call('mint',[mintAmount],{
                        value: ethers.utils.parseEther(mintprice)
                    })
                  }}
                  onSuccess={() =>{
                    alert('成功囉')
                  }}
                  onError={(error) =>{
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
          <Box>
            <Card maxH={'50vh'} overflow={'scroll'}>
              <CardBody>
                <Heading 
                  fontSize="30px"
                  fontFamily="VT323"
                  textShadow="0 1px #D6517D"
                  color="#D6517D"
                  fontWeight={'bold'}
                >
                Your Ticket History
                </Heading>
                {false ?
                  (
                    <Box>
                      {recentCoffee && recentCoffee?.map((coffee,index) => {
                        return (
                          <Card key={index} my={'10px'}>
                            <CardBody>
                              <Flex alignItems={'center'} mb={'10px'}>
                                <Image
                                  src={CoffeeLogo}
                                  alt='Coffee'
                                  width={30}
                                  height={30}
                                  mr={'10px'}
                                />
                                <Text fontWeight={'bold'} mr={'10px'}>
                                  {coffee[2]?coffee[2]:'匿名人士'}
                                </Text>
                                <Tooltip
                                  label={`錢包地址:${coffee[0]}`}
                                  bg={'gray.200'}
                                  color={'black'}
                                >
                                  <InfoOutlineIcon/>
                                </Tooltip>
                              </Flex>
                              <Flex>
                              <Text  mr={'10px'}>
                                  {coffee[1]?coffee[1]:'no message'}
                                </Text>
                              </Flex>
                            </CardBody>
                          </Card>
                        )
                        })
                      }
                    </Box>
                  ) : (
                    <Stack>
                      <Skeleton height={'100px'}/>
                      <Skeleton height={'100px'}/>
                      <Skeleton height={'100px'}/>
                    </Stack>
                  )
                }
              </CardBody>
            </Card>
          </Box>
          <Box>
            {address ? (
              <div>
                <Web3Button
                  contractAddress={NFT_ADDRESS}
                  action={async() => {
                    await contract.call('burn',[value],{
                        // value: ethers.utils.parseEther(mintprice)
                    })
                  }}
                  onSuccess={() =>{
                    alert('成功囉')
                  }}
                  onError={(error) =>{
                    alert(error)
                  }}
                  isDisabled = {!allChecked}
                >
                  Burn
                </Web3Button>
                <Flex align="center" justify="center">
                  <Text mb='8px' color={'black'}>Value:</Text>
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
            
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex >
  )
}

export default MainMint
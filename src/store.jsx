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
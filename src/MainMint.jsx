import React from 'react'
import { Flex, Box, Text,Spacer} from '@chakra-ui/react'
const MainMint = () => {
  // const { instance } = useContract({
  //   abi: ABI,
  //   address: 'NFT_ADDRESS',
  //   provider: new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/your-project-id')
  // })

  // useEffect(() => {
  //   instance.on('NewBuying', (from, timestamp, mintAmount, totalSupply) => {
  //     console.log('NewBuying event:', from, timestamp, mintAmount, totalSupply);
  //   });
  //   // unsubscribe from the event when the component unmounts
  //   return () => instance.removeAllListeners('NewBuying');
  // }, [instance]);

  return (
    <Flex justify="center" align="center" >
      <Flex
        w={'100%'}
        flexDirection={'column'}
      >
        <Box>
          <div className="mint-container">
            <Text fontSize="4xl" textShadow="0 5px #000" color={"pink.300"}>Buymeticket</Text>
            <Text
              fontSize="3xl"
              letterSpacing="0.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000"
            >
              I hate scalper ticket.
              <Spacer/>
              Our mission is to ensure that all fan can buy a ticket at fair price.
            </Text>
          </div>
        </Box>
      </Flex>
    </Flex >
  )
}

export default MainMint
import {
    Box,
    Heading,
    Text,
    Spacer
} from '@chakra-ui/react';
function Info() {
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
                    Mint Operation Manual
                </Heading>
                <Text
                    fontSize="3xl"
                    letterSpacing="0.5%"
                    fontFamily="VT323"
                    textShadow="0 2px 2px #000"
                >
                    STEP1:Staking
                    <Spacer />
                    Staking BmT in our staking pool to get the BA token
                    <Spacer />
                    STEP2:Buy Mint Authority
                    <Spacer />
                    Choose one concert and spend BA token to exchange Buy Authority of specific concert
                    <Spacer />
                    STEP3:Mint NFT
                    <Spacer />
                    Spending Buy Authority to mint the NFT ticket ,noticing that you can only get 90% of current price when you refund
                    <Spacer />
                    STEP4:Ckeck NFT
                    <Spacer />
                    Go to the Mint History or Opensea to check your NFT in Wallet
                </Text>
            </Box>
        </Box>
    );
}
export default Info;
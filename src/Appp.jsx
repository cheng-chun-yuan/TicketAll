import {
    Box,
    Flex,
    Heading,
    HStack,
    Icon,
    Image,
    Link,
    Skeleton,
    Spacer,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import Linchielon from './assets/social-media-icons/concert.png';
import ylbull from './assets/social-media-icons/singer.png';
export const Appp = () => (
    <Box
        maxW="7xl"
        mx="auto"
        px={{
            base: '0',
            lg: '12',
        }}
        py={{
            base: '0',
            lg: '12',
        }}
    >
        <Stack
            direction={{
                base: 'column-reverse',
                lg: 'row',
            }}
            spacing={{
                base: '0',
                lg: '20',
            }}
        >
            <Box
                width={{
                    lg: 'sm',
                }}
                transform={{
                    base: 'translateY(-50%)',
                    lg: 'none',
                }}
                bg={{
                    base: useColorModeValue('red.50', 'gray.700'),
                    lg: 'none',
                }}
                mx={{
                    base: '6',
                    md: '8',
                    lg: '0',
                }}
                px={{
                    base: '6',
                    md: '8',
                    lg: '0',
                }}
                py={{
                    base: '6',
                    md: '8',
                    lg: '12',
                }}
            >
                <Stack
                    spacing={{
                        base: '8',
                        lg: '10',
                    }}
                    bg={'white'}
                    opacity={'80%'}
                >
                    <Stack
                        spacing={{
                            base: '2',
                            lg: '4',
                        }}
                    >
                        <Heading size="xl" color={useColorModeValue('red.500', 'red.300')} fontFamily="VT323">
                            Welcome to 071 Concert
                        </Heading>
                        <Heading size="xl" fontWeight="normal" color={useColorModeValue('black', 'black')} fontFamily="VT323">
                            Official Sales Start : 2023/05/14 (SUN) 0AM
                            <Spacer/>
                            Venue : National Taiwan University (NTU)
                        </Heading>
                    </Stack>
                    <HStack spacing="3">
                        <Link color={useColorModeValue('red.500', 'red.300')} fontWeight="bold" fontSize="lg" href='concert' margin={2}>  
                            Mint Now
                        </Link>
                        <Icon color={useColorModeValue('red.500', 'red.300')} as={FaArrowRight} />
                    </HStack>
                </Stack>
            </Box>
            <Flex flex="1" overflow="hidden">
                <Image
                    src={Linchielon}
                    alt="Lovely Image"
                    fallback={<Skeleton />}
                    maxH="450px"
                    minW="300px"
                    objectFit="cover"
                    flex="1"
                />
                <Image
                    display={{
                        base: 'none',
                        sm: 'initial',
                    }}
                    src={ylbull}
                    alt="Lovely Image"
                    fallback={<Skeleton />}
                    maxH="450px"
                    objectFit="cover"
                />
            </Flex>
        </Stack>
    </Box>
)
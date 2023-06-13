import React, { ReactNode } from 'react';
import {
    Box,
    Text,
    Flex,
    useColorModeValue,
    Image,
    chakra,
    Container,
    Stack,
    VisuallyHidden,
} from '@chakra-ui/react';
import Ticket from './ticket.jpeg';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            fontSize={'2xl'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};
export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('transparent', 'transparent')}
            color={useColorModeValue('white', 'gray.200')}>
            <Box py={100}>
                <Flex
                    align={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        mr: 8,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: useColorModeValue('gray.200', 'gray.700'),
                        flexGrow: 1,
                        ml: 8,
                    }}>
                    <Image
                        height={10}
                        src={Ticket}
                        alt='Ticket'
                        mr='12px'
                    />
                    <Text>
                        BuymeTicket
                    </Text>
                </Flex>
                <Container
                    as={Stack}
                    maxW={'6xl'}
                    py={4}
                    direction={{ base: 'column', md: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'space-between' }}
                    align={{ base: 'center', md: 'center' }}>
                    <Text>© 2023 Buymeticket. All rights reserved</Text>
                    <Stack direction={'row'} spacing={6}>
                        <SocialButton label={'Twitter'} href={'https://twitter.com/elonmusk'} >
                            <FaTwitter />
                        </SocialButton>
                        <SocialButton label={'Facebook'} href={'https://www.facebook.com/profile.php?id=100079969282356'}>
                            <FaFacebook />
                        </SocialButton>
                        <SocialButton label={'Instagram'} href={'https://www.instagram.com/hgf.yuan_/'}>
                            <FaInstagram />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
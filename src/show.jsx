import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI.json'; // Replace with your ERC721 contract ABI
import { NFT_ADDRESS } from './const/contractAddress';
import { useAddress } from "@thirdweb-dev/react";
import {
    Box,
    Text,
    Heading,
    Image,
} from '@chakra-ui/react';
const YourComponent = () => {
    const [nfts, setNFTs] = useState([]);
    const address = useAddress();
    const web3 = new Web3('https://goerli.infura.io/v3/b82e2ff0e6f445c8812457351e2947a7');
    const contract = new web3.eth.Contract(contractABI, NFT_ADDRESS);
    useEffect(() => {
        const fetchOwnedNFTs = async () => {
            
            // const tokenIds = await contract.methods.stakeOfOwner(address).call();
            const tokenIds = [1,2];
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

        const pinataUrl = await contract.methods.tokenURI(tokenId).call();
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
            <Heading>Your Owned NFTs</Heading>
            <Box>
                {nfts.map((nft) => (
                    <Box key={nft.tokenId}>
                        <Text>{nft.metadata.name}</Text>
                        <Image src={nft.metadata.image} alt={nft.metadata.name} h={'150px'}/>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default YourComponent;

import basicNftABI from '@/contracts/basicNft.json';
import nftMarketplace from '@/contracts/nftMarketplace.json';


// NFT Methods

export const mintNftConfig = {
    abi: basicNftABI.abi,
    address: basicNftABI.address,
    functionName: 'mintNft',
    args: [],
}

export const approveNftConfig = {
    abi: basicNftABI.abi,
    address: basicNftABI.address,
    functionName: 'approve',
    args: [],
}

export const getApproveConfig = (tokenId, chainId) => {
    return {
        abi: basicNftABI.abi,
        address: basicNftABI.address,
        functionName: "getApproved",
        args: [tokenId],
        chainId
    }

}

// Market Methods
export const listNftConfig = {
    abi: nftMarketplace.abi,
    address: nftMarketplace.address,
    functionName: 'listItem',
    args: [],
}

export const buyNftConfig = {
    abi: nftMarketplace.abi,
    address: nftMarketplace.address,
    functionName: 'buyItem',
    args: []
}

export const getUpdateConfig = (nftAddress, tokenId, newPrice) => {
    return {
        abi: nftMarketplace.abi,
        address: nftMarketplace.address,
        functionName: 'updateListing',
        args: [nftAddress, tokenId, newPrice]
    }
}

export const getCancelConfig = (nftAddress, tokenId) => {
    return {
        abi: nftMarketplace.abi,
        address: nftMarketplace.address,
        functionName: 'cancelListing',
        args: [nftAddress, tokenId]
    }
}

export const getProceedsConfig = (address) => {
    return {
        abi: nftMarketplace.abi,
        address: nftMarketplace.address,
        functionName: 'getProceeds',
        args: [address]
    }
}

export const widthdrawProceeedsConfig = () => {
    return {
        abi: nftMarketplace.abi,
        address: nftMarketplace.address,
        functionName: 'widthdrawProceeeds',
        args: []
    }
}

// React Query Keys

export const QUERY_KEY = {
    GET_LISTED_ITEMS: 'GET_LISTED_ITEMS',
}
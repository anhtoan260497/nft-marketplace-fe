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

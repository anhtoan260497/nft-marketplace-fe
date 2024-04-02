import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useNftInfo = async (nftInfo) => {
    const moralisStared =  useSelector(state => state.moralisReducer.isStarted)

    useEffect(() => {
        console.log('oralis.Core.isStarted', moralisStared)
        if (Moralis.Core.isStarted) getNftInfo()
    }, [moralisStared])

    const getNftInfo = async () => {
        const response = await Moralis.EvmApi.nft.getNFTMetadata({
            "chain": nftInfo[0].chainId,
            "format": "decimal",
            "normalizeMetadata": true,
            "mediaItems": false,
            "address": nftInfo[0].nftAddress,
            "tokenId": nftInfo[0].tokenId
        });

        console.log(response.raw)
    }

    return {
        ...nftInfo,
    }
}

export default useNftInfo
import { convertMetaData } from "@/helper";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useNftInfo = (nfts) => {
    // const [items, setItems] = useState([])
    const moralisStared = useSelector(state => state.moralisReducer.isStarted)
    const [listItems, setListItems] = useState([])

    useEffect(() => {
        if (Moralis.Core.isStarted) getNftInfo()
    }, [moralisStared])



    const getNftInfo = async () => {
        let items = []
        for (let item of nfts) {
            const response = await Moralis.EvmApi.nft.getNFTMetadata({
                "chain": item.chainId,
                "format": "decimal",
                "normalizeMetadata": true,
                "mediaItems": false,
                "address": item.nftAddress,
                "tokenId": item.tokenId
            });

            items.push({...response.raw,...item})
        }
        setListItems(items)
    }

    return listItems
}


export default useNftInfo
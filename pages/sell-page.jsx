import ModalCustom from "@/components/Modal";
import NftItem from "@/components/NftItem";
import Toast from "@/components/Toast";
import useMoralisStart from "@/hooks/useMoralisStart";
import useRenderClient from "@/hooks/useRenderClient";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

const SellPage = () => {
    const [nfts, setNfts] = useState([])
    const chainId = useChainId()
    const { address } = useAccount()
    useMoralisStart();
    const isClient = useRenderClient()

console.log(parseInt('0x0de0b6b3a7640000') / 10 ** 18)

    useEffect(() => {
        const getNfts = async () => {
            if (!address) return []
            const response = await Moralis.EvmApi.nft.getWalletNFTs({
                "chain": chainId,
                "format": "decimal",
                "mediaItems": false,
                address
            });

            setNfts(response.raw.result)
        }
        getNfts()
    }, [chainId, address])


    const renderNftList = () => {
        return nfts.map(item => <NftItem isNormalPage nftItem={item} key={item.token_id} />)
    }


    return <div className="wrapped-body">
        <div className="padding-top-64"></div>
        <Toast />
        <p className="text-center font-bold text-3xl my-8">Recently Listed</p>
        {address && isClient ? <div className='p-5 flex justify-center flex-wrap gap-8'>
            {renderNftList()}
            <ModalCustom />
        </div> : <div className='no-wallet' style={{ alignItems: 'flex-start' }}>Please connect your wallet first to mint</div>}

    </div>
}

export default SellPage;

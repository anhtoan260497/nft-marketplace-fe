import ModalCustom from "@/components/Modal";
import NftItem from "@/components/NftItem";
import Toast from "@/components/Toast";
import { setIsOpenModal } from "@/features/modalSlice";
import useMoralisStart from "@/hooks/useMoralisStart";
import useRenderClient from "@/hooks/useRenderClient";
import { Button } from "flowbite-react";
import Moralis from "moralis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useChainId } from "wagmi";

const SellPage = () => {
    useMoralisStart();
    const moralisStart = useSelector(state => state.moralisReducer.isStarted)
    const [nfts, setNfts] = useState([])
    const chainId = useChainId()
    const { address } = useAccount()
    const isClient = useRenderClient()
    const dispatch = useDispatch()

    useEffect(() => {
        const getNfts = async () => {
            if (!address || !moralisStart) return []
            const response = await Moralis.EvmApi.nft.getWalletNFTs({
                "chain": chainId,
                "format": "decimal",
                "mediaItems": false,
                address
            });
            setNfts(response.raw.result)
        }
        getNfts()
    }, [chainId, address, moralisStart])


    const renderNftList = () => {
        return nfts.map(item => <NftItem isNormalPage nftItem={item} key={item.token_id} />)
    }

    const widthDrawMoney = () => {
        dispatch(setIsOpenModal({
            isActive: true,
            type: 'widthdraw',
        }))
    }


    return <div className="wrapped-body">
        <div className="padding-top-64"></div>
        <Toast />
        <div className="my-8 flex w-full">
            <p className="text-center font-bold text-2xl w-11/12">Your Nfts</p>
            <Button className="bg-green-600 font-bold w-auto" onClick={widthDrawMoney}>Widthdraw</Button>
        </div>
        {address && isClient ? <div className='p-5 flex justify-center flex-wrap gap-8'>
            {renderNftList()}
            <ModalCustom />
        </div> : <div className='no-wallet' style={{ alignItems: 'flex-start' }}>Please connect your wallet first to see your NFTs</div>}

    </div>
}

export default SellPage;

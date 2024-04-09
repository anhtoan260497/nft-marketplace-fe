import ModalCustom from "@/components/Modal"
import NftItem from "@/components/NftItem"
import { convertMetaData } from "@/helper"
import useMoralisStart from "@/hooks/useMoralisStart"
import useNftInfo from "@/hooks/useNftInfo"
import { Toast } from "flowbite-react"
import { useState } from "react"


const HomePage = ({ listedItems }) => {

    useMoralisStart()
    const listedItemsInfo = useNftInfo(listedItems)

    const renderNftList = () => {
        return listedItemsInfo.map(item => <NftItem nftItem={item} isListedPage key={item._id} />)
    }

    return (
        <div className="wrapped-body">
            <div className="padding-top-64"></div>
            <h1 className="text-center font-bold text-2xl mt-5">Recently Listed</h1>
            <div className=" w-full p-5 flex justify-center flex-wrap gap-8">
                {renderNftList()}
            </div>
            <ModalCustom />
        </div>
    )

}

export const getStaticProps = async () => {

    const items = await (await fetch('https://nft-marketplace-be-lycn.onrender.com/nft/list-item/0xaa36a7',{cache :  'no-store'})).json()

    return {
        props: {
            listedItems: items
        }
    }
}

export default HomePage
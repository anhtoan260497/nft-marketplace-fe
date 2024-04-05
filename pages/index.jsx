import ModalCustom from "@/components/Modal"
import NftItem from "@/components/NftItem"
import { convertMetaData } from "@/helper"
import useMoralisStart from "@/hooks/useMoralisStart"
import useNftInfo from "@/hooks/useNftInfo"
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
            <div className=" w-full p-5 flex justify-center flex-wrap gap-8">
                {renderNftList()}
            </div>
            <ModalCustom />
        </div>
    )

}

export const getStaticProps = async () => {

    const items = await (await fetch('https://cosmic-brightly-lobster.ngrok-free.app/nft/list-item/0xaa36a7')).json()

    return {
        props: {
            listedItems: items
        }
    }
}

export default HomePage
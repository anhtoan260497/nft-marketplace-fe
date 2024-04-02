import Header from "@/components/Header"
import Head from "next/head"
import Moralis from "moralis"
import React, { useEffect, useState } from "react"
import { useEvmNativeBalance } from "@moralisweb3/next"
import useGetListedItems from "@/hooks/useGetListedItems"
import NftItem from "@/components/NftItem"
import useNftInfo from "@/hooks/useNftInfo"
import useMoralisStart from "@/hooks/useMoralisStart"


const HomePage = ({ listedItems }) => {

    useMoralisStart()

    const a = useNftInfo(listedItems)

    return (
        <div className="wrapped-body">
            <div className="padding-top-64"></div>
            <div className="border-red w-full">
                {/* <NftItem /> */}
            </div>
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
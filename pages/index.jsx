import Header from "@/components/Header"
import Head from "next/head"
import Moralis from "moralis"
import React, { useEffect, useState } from "react"
import { useEvmNativeBalance } from "@moralisweb3/next"
import useGetListedItems from "@/hooks/useGetListedItems"


const HomePage = ({listedItems}) => {

   console.log(listedItems)

    return (
        <div>

        </div>
    )

}

export const getStaticProps  = async () => {

   const items = await (await fetch('https://cosmic-brightly-lobster.ngrok-free.app/nft/list-item/0xaa36a7')).json()
   
    return {
        props : {
           listedItems : items 
        }
    }
}

export default HomePage
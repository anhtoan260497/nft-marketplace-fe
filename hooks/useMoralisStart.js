import { setStart } from "@/features/moralisSlice";
import Moralis from "moralis";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";



const useMoralisStart = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (Moralis.Core.isStarted) return
        const connectMoralis = async () => {
            await Moralis.start({
                apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            });
        }
        dispatch(setStart(true))
        connectMoralis()
    }, [])
}

export default useMoralisStart
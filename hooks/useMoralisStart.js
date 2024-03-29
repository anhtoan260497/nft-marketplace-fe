import Moralis from "moralis";
import React, { useEffect } from "react";



const useMoralisStart = () => {

    useEffect(() => {
        if (Moralis.Core.isStarted) return
        const connectMoralis = async () => {
            await Moralis.start({
                apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            });
        }
        connectMoralis()
    }, [])
}

export default useMoralisStart
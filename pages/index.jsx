import Header from "@/components/Header"
import Head from "next/head"
import Moralis from "moralis"
import { useEffect, useState } from "react"
import { useEvmNativeBalance } from "@moralisweb3/next"

const HomePage = () => {

    const [balance, setBalance] = useState(0)


    useEffect(() => {
        start()
    }, [])
    console.log(process.env.NEXT_PUBLIC_MORALIS_API_KEY)

    const start = async () => {
        try {
            await Moralis.start({
                apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY
            });

            const response = await Moralis.EvmApi.balance.getNativeBalance({
                "chain": "0xaa36a7",
                "address": "0x8aA0B1432BE0983675F1B2505069Cd4F394d1f1D"
            });
            setBalance(response.raw.balance)

        } catch (e) {
            console.error(e);
        }
    }




    return (
        <div>

            <div>
                <h3>Wallet: {'0x8aA0B1432BE0983675F1B2505069Cd4F394d1f1D'}</h3>
                <h3>Native Balance: {balance / 10e18} ETH</h3>
            </div>

        </div>
    )


}

export default HomePage
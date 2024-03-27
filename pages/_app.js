import Header from "@/components/Header"
import Head from "next/head"
import '@rainbow-me/rainbowkit/styles.css';
import "../app/globals.scss";
import config from "@/config-wagmi";


import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import Moralis from "moralis";


const queryClient = new QueryClient();



export default function App({ Component, pageProps }) {

    useEffect(() => {
        const connectMoralis = async () => {
            await Moralis.start({
                apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
            });
        }
        connectMoralis()
    },[])

    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
                <link rel="icon" href="https://styles.redditmedia.com/t5_9vkrm/styles/communityIcon_dy4kuclo24gb1.png"></link>
            </Head>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <Header />
                        <Component {...pageProps} />
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}
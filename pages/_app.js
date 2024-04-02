import Header from "@/components/Header"
import Head from "next/head"
import '@rainbow-me/rainbowkit/styles.css';
import "../app/globals.scss";
import config from "@/config-wagmi";


import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import useMoralisStart from "@/hooks/useMoralisStart";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";


const queryClient = new QueryClient();



export default function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
                <link rel="icon" href="https://styles.redditmedia.com/t5_9vkrm/styles/communityIcon_dy4kuclo24gb1.png"></link>
            </Head>
            <Provider store={store}>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider>
                            <Header />
                            <Component {...pageProps} />
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </Provider>
        </>
    )
}
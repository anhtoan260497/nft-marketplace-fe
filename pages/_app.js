import Header from "@/components/Header";
import config from "@/config-wagmi";
import '@rainbow-me/rainbowkit/styles.css';
import Head from "next/head";
import "../app/globals.scss";


import { store } from "@/app/store/store";
import {
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { Provider } from "react-redux";
import { WagmiProvider } from 'wagmi';


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
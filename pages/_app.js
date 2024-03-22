import Header from "@/components/Header"
import Head from "next/head"
import '@rainbow-me/rainbowkit/styles.css';

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();


export default function App({ Component, pageProps }) {
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
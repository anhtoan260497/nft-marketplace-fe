

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    sepolia, bscTestnet
} from 'wagmi/chains';


const config = getDefaultConfig({
    appName: 'NFT Marketplace',
    projectId: '9f662e95dfb8cfacc06fac11c5f7177c',
    chains: [sepolia, bscTestnet],
    ssr: true,  // If your dApp uses server side rendering (SSR)
});

export default config
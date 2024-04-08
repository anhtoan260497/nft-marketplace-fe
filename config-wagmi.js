

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
    sepolia, bscTestnet
} from 'wagmi/chains';


const config = getDefaultConfig({
    appName: 'NFT Marketplace',
    projectId: '1011',
    chains: [sepolia, bscTestnet],
    ssr: true,  // If your dApp uses server side rendering (SSR)
});

export default config
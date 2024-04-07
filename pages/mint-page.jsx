import Button from "@/components/Button";
import NftItem from "@/components/NftItem";
import Toast from "@/components/Toast";
import useRenderClient from "@/hooks/useRenderClient";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";


const MintPage = () => {

    const { address } = useAccount()
    const isClient = useRenderClient()

    const nftData = [{
        name: 'Pug',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmZ4uHLzh35ufjFHHNbc7vAjuWmL7MWTKeARVzKsZoaJjY',
        description: 'Adorable Pug'
    }, {
        name: 'Shiba',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmdotT4u4Yq9UcgiWLZqoLPPnyn774Hsc2fqJtn6gWqHrw',
        description: 'Shiba Inu Awesome'
    }, {
        name: 'St.Benard',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmeaE4MTmQaomEXffrKKE2PaVZFuaT34DxVYyVn6xL7BsW',
        description: 'St.Bernard go ahead'
    }]
    

    return (
        <div>
            <div className="padding-top-64"></div>
            <div className="flex-justify-between wrapped-body">
                {
                    address && isClient ?
                        <div className="mt-6 w-full">
                            <p className="text-center font-bold text-2xl my-6">Mint NFT</p>
                            <div className="w-full flex flex-col items-center">
                                <NftItem nftItems={nftData} isMintPage />
                                <Button address={address} />
                            </div>

                        </div> :
                        <div className='no-wallet'>Please connect your wallet first to mint</div>
                }
            </div>
        </div>
    )
}
export default MintPage
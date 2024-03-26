import Button from "@/components/Button";
import NftItem from "@/components/NftItem";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";


const MintPage = () => {

    const { address } = useAccount()
    const [isClient, setisClient] = useState(false) // state for render run only on client

    useEffect(() => {
        setisClient(true)
    }, []) // useEffect for render only on client


    return (
        <div>
            <div className="padding-top-64"></div>
            <div className="flex-justify-between wrapped-body">
                {
                    address && isClient ?
                        <div className="mt-6 w-full">
                            <p className="text-center font-bold text-3xl my-6">Mint NFT</p>
                            <div className="w-max"> 
                                <NftItem />
                                <Button />
                            </div>

                        </div> :
                        <div className='no-wallet'>Please connect your wallet first to mint</div>

                }
            </div>
        </div>


    )
}

export default mintPage
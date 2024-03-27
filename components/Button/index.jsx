import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import clsx from 'clsx'
import Loader from '../Loader';
import basicNftABI from '@/contracts/basicNft.json';
import { useChainId, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import config from '@/config-wagmi';
import Toast from '../Toast';
import { shortTxnHash } from '@/helper';

Button.propTypes = {

};

function Button({ }) {

    const [isMinting, setIsMinting] = useState(false)
    const [mintStatus, setMintStatus] = useState({ type: '', message: '', isActive: false })
    const chainId = useChainId()

    const { writeContractAsync } = useWriteContract()
    const mintNftConfig = {
        abi: basicNftABI.abi,
        address: basicNftABI.address,
        functionName: 'mintNft',
        args: [],
    }

    useEffect(() => {
        if (!mintStatus.isActive) return
        const hidePopup = setTimeout(() => {
            setMintStatus({
                ...mintStatus, isActive: false
            })
        },5000)
        return () => {
            clearTimeout(hidePopup)
        }
    }, [mintStatus])

    const mintNft = async () => {
        try {
            setIsMinting(true)
            const txn = await writeContractAsync(mintNftConfig)
            const transactionReceipt = await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })
            setMintStatus({
                type: transactionReceipt.status,
                message: transactionReceipt.status === 'success' ? `Mint Succesfull with hash ${shortTxnHash(txn)}` : `Mint Error hash ${shortTxnHash()}`,
                isActive: true
            })
            setIsMinting(false)
        } catch (err) {
            console.error(err)
            setIsMintError(true)
        }
    }

    return (
        <div className={clsx(styles.buttonContainer, 'mt-3')}>
            <button className={clsx(styles.mintButton)} onClick={mintNft}>
                {isMinting && !mintStatus.isActive ? <Loader /> : 'Mint'}
            </button>
            <Toast type={mintStatus.type} message={mintStatus.message} isActive={mintStatus.isActive} />
        </div>
    );
}

export default Button;
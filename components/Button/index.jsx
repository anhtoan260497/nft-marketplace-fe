import config from '@/config-wagmi';
import { mintNftConfig } from '@/constants';
import { setToast } from '@/features/toastSlice';
import { shortTxnHash } from '@/helper';
import { waitForTransactionReceipt } from '@wagmi/core';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChainId, useWriteContract } from 'wagmi';
import Loader from '../Loader';
import Toast from '../Toast';
import styles from './styles.module.scss';

function Button() {

    const [isMinting, setIsMinting] = useState(false)
    const chainId = useChainId()
    const dispatch = useDispatch()
    const toastStatus =  useSelector(state => state.toastReducer)

    const { writeContractAsync } = useWriteContract()

    const mintNft = async () => {
        try {
            setIsMinting(true)
            const txn = await writeContractAsync(mintNftConfig)
            const transactionReceipt = await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })

            dispatch(setToast({
                type: transactionReceipt.status,
                message: transactionReceipt.status === 'success' ? `Mint Succesfull with hash ${shortTxnHash(txn)}` : `Mint Error hash ${shortTxnHash()}`,
                isActive: true
            }))

            setIsMinting(false)
        } catch (err) {
            console.error(err)
            dispatch(setToast({
                ...toastStatus,
                type: 'error',
                message : 'Mint Error',
                isActive: true
            }))
            setIsMinting(false)
        }
    }

    return (
        <div className={clsx(styles.buttonContainer, 'mt-3')}>
            <button className={clsx(styles.mintButton)} onClick={mintNft} disabled={toastStatus.isActive}>
                {isMinting && !toastStatus.isActive ? <Loader /> : 'Mint'}
            </button>
            <Toast />
        </div>
    );
}

export default Button;
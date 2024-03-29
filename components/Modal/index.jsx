"use client";


import config from "@/config-wagmi";
import { approveNftConfig, getApproveConfig, listNftConfig } from '@/constants';
import nftMarketplaceABI from '@/contracts/nftMarketplace.json';
import { setIsOpenModal, setSelectedNft } from "@/features/modalSlice";
import { setToast } from "@/features/toastSlice";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChainId, useReadContract, useWriteContract } from "wagmi";
import styles from './styles.module.scss';
import Loader from "../Loader";
import { getErrorMessageFromSolidity, parsePriceToEther, shortTxnHash } from "@/helper";

function ModalCustom() {

    // state and hooks
    const isOpenModal = useSelector(state => state.modalReducer.isOpenModal)
    const selectedNft = useSelector(state => state.modalReducer.selectedNft)
    const { writeContractAsync } = useWriteContract()
    const chainId = useChainId()
    const dispatch = useDispatch()
    const [price, setPrice] = useState('')
    const [isListing, setIsListing] = useState(false)
    const toastStatus = useSelector(state => state.toastReducer)
    const {data : approves} = useReadContract(getApproveConfig(selectedNft.tokenId, chainId))



    // methods
    const handleisOpenModal = () => {
        dispatch(setIsOpenModal(!isOpenModal))
        if (isOpenModal) {
            dispatch(setSelectedNft({ address: '', tokenId: '' }))
        }
        setPrice('')
    }
    const handleListItem = async () => {

        try {

            setIsListing(true)   
            if (approves !== nftMarketplaceABI.address) {

                const approveTxn = await writeContractAsync({
                    ...approveNftConfig,
                    args: [nftMarketplaceABI.address, selectedNft.tokenId]
                });

                await waitForTransactionReceipt(config, {
                    hash: approveTxn,
                    confirmations: 1,
                    chainId,
                })
                4

                dispatch(setToast({
                    type: 'success',
                    message: 'Approved Successfully',
                    isActive: true
                }))
            }

            const txn = await writeContractAsync({
                ...listNftConfig,
                args: [selectedNft.address, selectedNft.tokenId, parsePriceToEther(price)]
            })
            const transactionReceipt = await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })

            dispatch(setToast({
                ...toastStatus,
                isActive: false
            }))
            dispatch(setToast({
                type: 'success',
                message: `Listed Successfully with hash ${shortTxnHash(txn)}`,
                isActive: true
            }))
            setIsListing(false)
            dispatch(setIsOpenModal(!isOpenModal))
        } catch (err) {
            dispatch(setToast({
                type: 'error',
                message: getErrorMessageFromSolidity(err.message),
                isActive: true
            }))
            setIsListing(false)
        }
    }

    // JSX
    return (
        <div >
            <Modal  className={styles.modalContainer} show={isOpenModal}>
                <Modal.Body>
                    <h3 className="text-center font-bold text-3xl my-3">Sell NFT</h3>
                    <div className="space-y-6">
                        <div className={styles.inputField}>
                            <p className={styles.inputFieldLabel}>NFT's Address</p>
                            <input placeholder={selectedNft.address} disabled />
                        </div>

                        <div className={styles.inputField}>
                            <p className={styles.inputFieldLabel}>NFT's token ID</p>
                            <input placeholder={selectedNft.tokenId} disabled />
                        </div>

                        <div className={styles.inputField}>
                            <p className={styles.inputFieldLabel}>Enter price</p>
                            <input type='number' value={price} placeholder="0" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleListItem} disabled={price <= 0 || !price || isListing} style={{ minHeight: '36px' }}>{isListing ? <Loader /> : 'Listing'}</Button>
                    <Button onClick={handleisOpenModal} color="gray">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalCustom
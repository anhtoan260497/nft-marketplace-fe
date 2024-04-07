"use client";


import config from "@/config-wagmi";
import { approveNftConfig, getApproveConfig, listNftConfig, buyNftConfig } from '@/constants';
import nftMarketplaceABI from '@/contracts/nftMarketplace.json';
import { setIsOpenModal, setSelectedNft } from "@/features/modalSlice";
import { setToast } from "@/features/toastSlice";
import { getErrorMessageFromSolidity, parsePriceToEther, scanExplorerUrl, shortPrice, shortTxnHash } from "@/helper";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useBalance, useChainId, useReadContract, useWriteContract } from "wagmi";
import Loader from "../Loader";
import styles from './styles.module.scss';
import Image from "next/image";
import clsx from "clsx";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Toast from "../Toast";

function ModalCustom() {

    // state and hooks
    const isOpenModal = useSelector(state => state.modalReducer.isOpenModal)
    const type = useSelector(state => state.modalReducer.type)
    const selectedNft = useSelector(state => state.modalReducer.selectedNft)
    const { writeContractAsync } = useWriteContract()
    const chainId = useChainId()
    const dispatch = useDispatch()
    const [price, setPrice] = useState('')
    const [isListing, setIsListing] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const toastStatus = useSelector(state => state.toastReducer)
    const { data: approves } = useReadContract(getApproveConfig(selectedNft.tokenId, chainId))
    const { address } = useAccount()
    const { data: balance } = useBalance({ address })

    // methods
    const handleIsOpenModal = () => {
        dispatch(setIsOpenModal({
            isActive: !isOpenModal,
            type: ''
        }))
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
                message: <p>Listed successfully with hash <a className='link-color' href={scanExplorerUrl(chainId, txn)} target='_blank'>{shortTxnHash(txn)}</a></p>,
                isActive: true
            }))
            setIsListing(false)
            dispatch(setIsOpenModal({
                isActive: !isOpenModal
            }))
        } catch (err) {
            dispatch(setToast({
                type: 'error',
                message: getErrorMessageFromSolidity(err.message),
                isActive: true
            }))
            setIsListing(false)
        }
    }

    const handleBuyItem = async () => {
        dispatch(setToast({
            type: 'success',
            // message: <p>Bought successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
            message: [<p key={1}>dasdasd</p>],
            isActive: true
        }))
        // setIsBuying(true)
        // try {
        //     const txn = await writeContractAsync({
        //         ...buyNftConfig,
        //         args: [selectedNft.address, selectedNft.tokenId],
        //         value: selectedNft.price
        //     })

        //     await waitForTransactionReceipt(config, {
        //         hash: txn,
        //         confirmations: 1,
        //         chainId,
        //     })
        //     dispatch(setToast({
        //         type: 'success',
        //         message: <p>Bought successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
        //         isActive: true
        //     }))
        //     setIsBuying(false)
        //     dispatch(setIsOpenModal({
        //         isActive: false,
        //         type : ''
        //     }))
        // } catch (err) {
        //     dispatch(setToast({
        //         type: 'error',
        //         message: getErrorMessageFromSolidity(err.message),
        //         isActive: true
        //     }))
        //     setIsBuying(false)
        // }
    }

    // JSX
    return (
        <div >
                 <Toast />   
            <Modal className={styles.modalContainer} show={isOpenModal && type === 'list'}>
                <Modal.Body>
                    <h3 className="text-center font-bold text-3xl my-3">Sell NFT</h3>
                    <div className="space-y-6">
                        <div className={styles.inputField}>
                            <p className={styles.inputFieldLabel}>{`NFT's Address`}</p>
                            <input placeholder={selectedNft.address} disabled />
                        </div>

                        <div className={styles.inputField}>
                            <p className={styles.inputFieldLabel}>{`NFT's TokenId`}</p>
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
                    <Button onClick={handleIsOpenModal} color="gray">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className={styles.modalContainer} show={isOpenModal && type === 'buy'}>
                <Modal.Body>
                    <h3 className="text-center font-bold text-3xl my-3">Buy NFT</h3>
                    <div className={styles.buyNftContainer}>
                        <div className={styles.buyNftInfo}>
                            <div className={styles.buyNftInfoItem}>
                                <p>NFTs Name</p>
                                <input placeholder={`${selectedNft.metaData?.name} #${selectedNft.tokenId}`} disabled />
                            </div>
                            <div className={styles.buyNftInfoItem}>
                                <p>NFTs Address</p>
                                <input placeholder={selectedNft.address} disabled />
                            </div>
                        </div>
                        <div className={styles.buyNftImage}>
                            <Image alt="" src={selectedNft.metaData?.image} width={150} height={150} />
                            <p className={clsx('text-center')}>{selectedNft.priceFormat} ETH</p>
                        </div>
                    </div>
                    {balance?.value < selectedNft.price && <p className="mt-4 text-red-600 font-semibold">Insufficent Balance</p>}
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buyNftFooter}>
                        <div className={styles.buyNftFooterOptions}>
                            {address ?
                                <Button onClick={handleBuyItem} disabled={!selectedNft.price || selectedNft.price > balance?.value} style={{ minHeight: '36px' }}>{isBuying ? <Loader /> : 'Buy'}</Button>
                                : <div className={styles.connectButton}><ConnectButton /></div>}
                            <Button onClick={handleIsOpenModal} color="gray">
                                Cancel
                            </Button>
                        </div>
                        {address && <p className={styles.currentBalance} >Your current balance: <span className={clsx("font-bold", balance?.value < selectedNft.price && "text-red-600")}>{shortPrice(balance?.formatted)} ETH</span></p>}
                    </div>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalCustom
"use client";


import config from "@/config-wagmi";
import { approveNftConfig, buyNftConfig, getApproveConfig, getCancelConfig, getProceedsConfig, getUpdateConfig, listNftConfig, widthdrawProceeedsConfig } from '@/constants';
import nftMarketplaceABI from '@/contracts/nftMarketplace.json';
import { setIsOpenModal, setSelectedNft } from "@/features/modalSlice";
import { setToast } from "@/features/toastSlice";
import { chainNativeTokenSymbol, getErrorMessageFromSolidity, parsePriceToEther, scanExplorerUrl, shortPrice, shortTxnHash } from "@/helper";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { waitForTransactionReceipt } from "@wagmi/core";
import clsx from "clsx";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatEther } from "viem";
import { useAccount, useBalance, useChainId, useReadContract, useWriteContract } from "wagmi";
import Loader from "../Loader";
import Toast from "../Toast";
import styles from './styles.module.scss';

function ModalCustom() {

    // state and hooks
    const isOpenModal = useSelector(state => state.modalReducer.isOpenModal)
    const type = useSelector(state => state.modalReducer.type)
    const selectedNft = useSelector(state => state.modalReducer.selectedNft)
    const { writeContractAsync } = useWriteContract()
    const chainId = useChainId()
    const dispatch = useDispatch()
    const [price, setPrice] = useState('')
    const [newPrice, setNewPrice] = useState()
    const [isListing, setIsListing] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [isCanceling, setIsCanceling] = useState(false)
    const [widthdrawing, setWidthdrawing] = useState(false)
    const toastStatus = useSelector(state => state.toastReducer)
    const { data: approves } = useReadContract(getApproveConfig(selectedNft.tokenId, chainId))
    const { address } = useAccount()
    const { data: balance } = useBalance({ address })
    const { data: proceeds } = useReadContract({
        ...getProceedsConfig(address)
    })



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
        setIsBuying(true)
        try {
            const txn = await writeContractAsync({
                ...buyNftConfig,
                args: [selectedNft.address, selectedNft.tokenId],
                value: selectedNft.price
            })

            await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })
            dispatch(setToast({
                type: 'success',
                message: <p>Bought successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
                isActive: true
            }))
            setIsBuying(false)
            dispatch(setIsOpenModal({
                isActive: false,
                type: ''
            }))
        } catch (err) {
            dispatch(setToast({
                type: 'error',
                message: getErrorMessageFromSolidity(err.message),
                isActive: true
            }))
            setIsBuying(false)
        }
    }

    const handleUpdateItem = async () => {
        setIsBuying(true)
        console.log({ ...getUpdateConfig(selectedNft.address, selectedNft.tokenId, parsePriceToEther(newPrice)) })
        try {
            const txn = await writeContractAsync({
                ...getUpdateConfig(selectedNft.address, selectedNft.tokenId, parsePriceToEther(newPrice)),
            })

            await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })

            dispatch(setToast({
                type: 'success',
                message: <p>Update successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
                isActive: true
            }))
            setIsBuying(false)
            window.location.reload();
            dispatch(setIsOpenModal({
                isActive: false,
                type: ''
            }))
        } catch (err) {
            console.log(err)
            dispatch(setToast({
                type: 'error',
                message: getErrorMessageFromSolidity(err.message),
                isActive: true
            }))
            setIsBuying(false)
        }
    }

    const handleCancelItem = async () => {
        setIsCanceling(true)
        try {
            const txn = await writeContractAsync({ ...getCancelConfig(selectedNft.address, selectedNft.tokenId) })
            await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })

            dispatch(setToast({
                type: 'success',
                message: <p>Unlist successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
                isActive: true
            }))
            setIsCanceling(false)
            window.location.reload();
            dispatch(setIsOpenModal({
                isActive: false,
                type: ''
            }))
        } catch (err) {
            console.log(err)
            dispatch(setToast({
                type: 'error',
                message: getErrorMessageFromSolidity(err.message),
                isActive: true
            }))
            setIsCanceling(false)
        }
    }

    const handleWidthdraw = async () => {
        try {
            setWidthdrawing(true)
            const txn = await writeContractAsync({ ...widthdrawProceeedsConfig() })
            await waitForTransactionReceipt(config, {
                hash: txn,
                confirmations: 1,
                chainId,
            })

            dispatch(setToast({
                type: 'success',
                message: <p>Widthdraw successfully with hash <a href={scanExplorerUrl(chainId, txn)}>{shortTxnHash(txn)}</a></p>,
                isActive: true
            }))
            setWidthdrawing(false)
            dispatch(setIsOpenModal({
                isActive: false,
                type: ''
            }))
        } catch (err) {

        }
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
                            <p className={clsx('text-center')}>{selectedNft.priceFormat} {chainNativeTokenSymbol(chainId)}</p>
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
                        {address && <p className={styles.currentBalance} >Your current balance: <span className={clsx("font-bold", balance?.value < selectedNft.price && "text-red-600")}>{shortPrice(balance?.formatted)} {chainNativeTokenSymbol(chainId)}</span></p>}
                    </div>

                </Modal.Footer>
            </Modal>

            <Modal className={styles.modalContainer} show={isOpenModal && type === 'update'}>
                <Modal.Body>
                    <h3 className="text-center font-bold text-3xl my-3">Update Price</h3>
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
                            <div className={styles.buyNftInfoItem}>
                                <p>NFTs New Price</p>
                                <div className={styles.priceInput}>
                                    <input type="number" placeholder={selectedNft.priceFormat} value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                    <p>{chainNativeTokenSymbol(chainId)}</p>
                                </div>

                            </div>
                        </div>
                        <div className={styles.buyNftImage}>
                            <Image alt="" src={selectedNft.metaData?.image} width={150} height={150} />
                            <p className={clsx('text-center')}>{selectedNft.priceFormat} {chainNativeTokenSymbol(chainId)}</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={styles.buyNftFooter}>
                        <div className={styles.buyNftFooterOptions}>
                            {address ?
                                <Button onClick={handleUpdateItem} disabled={!newPrice || newPrice <= 0 || newPrice == parseFloat(selectedNft.priceFormat)} style={{ minHeight: '36px' }}>{isBuying ? <Loader /> : 'Update'}</Button>
                                : <div className={styles.connectButton}><ConnectButton /></div>}
                            <Button onClick={handleIsOpenModal} color="gray">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal className={styles.modalContainer} show={isOpenModal && type === 'cancel'}>
                <Modal.Body>

                    <h3 className="text-center font-bold text-3xl my-3">Unlisting NFT</h3>
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
                            <p className={clsx('text-center')}>{selectedNft.priceFormat} {chainNativeTokenSymbol(chainId)}</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to unlisiting this NFT?
                        </h3>
                        <div className="flex justify-center gap-4">
                            {address ?
                                <Button color='failure' onClick={handleCancelItem} style={{ minHeight: '36px' }}>{isCanceling ? <Loader /> : 'Yes, unlist NFT'}</Button>
                                : <div className={styles.connectButton}><ConnectButton /></div>}
                            <Button onClick={handleIsOpenModal} color="gray">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal className={styles.modalContainer} show={isOpenModal && type === 'widthdraw'}>
                <Modal.Body>
                    <h3 className="text-center font-bold text-3xl my-3">Widthdraw</h3>
                    <div className={styles.buyNftContainer}>
                        <div className={styles.widthdrawInfo}>
                            <div className={styles.buyNftInfoItem}>
                                <p>Your address</p>
                                <input placeholder={`${address}`} disabled />
                            </div>
                            <div className={styles.buyNftInfoItem}>
                                <p>Your balance</p>
                                <input placeholder={proceeds ? formatEther(proceeds) : 0} disabled />
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center gap-4">
                            {address ?
                                <Button className="bg-green-600 font-bold" onClick={handleWidthdraw} disabled={!proceeds || proceeds <= 0} style={{ minHeight: '36px' }}>{widthdrawing ? <Loader /> : 'Widthdraw'}</Button>
                                : <div className={styles.connectButton}><ConnectButton /></div>}
                            <Button onClick={handleIsOpenModal} color="gray">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalCustom
import { setIsOpenModal, setSelectedNft } from '@/features/modalSlice';
import { convertMetaData, shortTxnHash } from '@/helper';
import useRenderClient from '@/hooks/useRenderClient';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';
import styles from './styles.module.scss';


function NftItem({ nftItems, nftItem, isMintPage, isNormalPage, isListedPage }) {

    const [nftIndex, setNftIndex] = useState(0)
    const metaData = nftItem?.metadata && convertMetaData(nftItem.metadata)
    const { address } = useAccount()
    const isClient = useRenderClient()
    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        if (!isMintPage) return
        let index = 0
        const intervalImage = setInterval(() => {
            if (index === 2) {
                index = 0
            } else {
                index++
            }
            setNftIndex(index)
        }, 2000)
        return () => {
            clearInterval(intervalImage)
        }
    }, [isMintPage])

    const checkWhoOwned = () => {
        if (!isClient) return
        if (address?.toLowerCase() === nftItem.owner_of) {
            return <p className='font-medium'>Owned by you</p>
        }
        return <p className='font-medium'>Owned by {shortTxnHash(nftItem.owner_of)}</p>
    }

    const handleClickNftItem = () => {
        if (isListedPage) return
        dispatch(setIsOpenModal({
            isActive: true,
            type: 'list'
        }))
        dispatch(setSelectedNft({
            address: nftItem.token_address,
            tokenId: nftItem.token_id
        }))
    }

    const handleClickBuyButton = () => {
        if (address?.toLowerCase() === nftItem.owner_of) {
            dispatch(setIsOpenModal({
                isActive: true,
                type: 'update',
            }))
        } else {
            dispatch(setIsOpenModal({
                isActive: true,
                type: 'buy',
            }))
        }


        dispatch(setSelectedNft({
            address: nftItem.token_address,
            tokenId: nftItem.token_id,
            metaData: nftItem.normalized_metadata,
            priceFormat: nftItem.priceFormat,
            price: nftItem.price,
            owner: nftItem.owner_of
        }))
    }

    const handleCancelItem = () => {
        dispatch(setIsOpenModal({
            isActive: true,
            type: 'cancel',
        }))

        dispatch(setSelectedNft({
            address: nftItem.token_address,
            tokenId: nftItem.token_id,
            metaData: nftItem.normalized_metadata,
            priceFormat: nftItem.priceFormat,
            price: nftItem.price,
            owner: nftItem.owner_of
        }))
    }

    return (
        <div className={clsx(styles.nftItemContainer, (isNormalPage || isListedPage) && styles.responsiveNormalPage)} style={
            (isNormalPage || isListedPage) && { cursor: 'pointer' }
        } onClick={handleClickNftItem} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {(isNormalPage || isListedPage) && <div className={clsx(styles.nftHeadInfo, 'flex', 'justify-between')}>
                {checkWhoOwned()}
                <p title={nftItem.owner_of}>{`#${nftItem.token_id}`}</p>
            </div>}
            <p className={styles.nftName} >{isMintPage ? nftItems[nftIndex].name : metaData?.name}</p>
            <Image className={styles.nftImage} src={isMintPage ? nftItems[nftIndex].image : metaData?.image} width={200} height={200} alt="Doge" priority />
            <p className={styles.nftDescription}>{isMintPage ? nftItems[nftIndex].description : metaData?.description}</p>
            {nftItem?.price && <p className={styles.nftPrice}>{nftItem?.priceFormat} ETH</p>}
            {nftItem?.price &&
                <div className={clsx(styles.nftOptions, isHover && styles.nftOptionsActive)}>
                    <p onClick={handleClickBuyButton} className={styles.nftOptionsBuynow}>{address?.toLowerCase() === nftItem.owner_of ? 'Update' : 'Buy now'}{nftItem?.price && address?.toLowerCase() === nftItem.owner_of && <span className={styles.nftOptionsPriceMobile}> | {nftItem?.priceFormat} ETH</span>}</p>
                    <div className={styles.nftOptionsGap}></div>
                    {address?.toLowerCase() === nftItem.owner_of ? <p className={clsx(styles.nftOptionsPrice, styles.nftoptionsCancel, 'bg-red-500')} onClick={handleCancelItem}>Cancel</p> : <p className={styles.nftOptionsPrice}>{nftItem.priceFormat} ETH</p>}
                </div>
            }
        </div>
    );
}

export default NftItem;
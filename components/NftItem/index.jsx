import { setIsOpenModal, setSelectedNft } from '@/features/modalSlice';
import { convertMetaData, shortTxnHash } from '@/helper';
import useRenderClient from '@/hooks/useRenderClient';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import styles from './styles.module.scss'


function NftItem({ nftItems, nftItem, isMintPage, isNormalPage }) {

    const [nftIndex, setNftIndex] = useState(0)
    const metaData = nftItem?.metadata && convertMetaData(nftItem.metadata)
    const { address } = useAccount()
    const isClient = useRenderClient()
    const dispatch = useDispatch()
    const isOpenModal = useSelector(state => state.modalReducer.isOpenModal)

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
        if (!isNormalPage || !address || !isClient) return
        if (address.toLowerCase() === nftItem.owner_of) {
            return `Owned by you`
        }
        return `Owned by ${shortTxnHash(nftItem.owner_of)}`
    }

    const handleClickNftItem = () => {
      dispatch(setIsOpenModal(!isOpenModal))
      dispatch(setSelectedNft({
        address : nftItem.token_address,
        tokenId : nftItem.token_id
      }))
    }


    return (
        <div className={clsx(styles.nftItemContainer, isNormalPage && styles.responsiveNormalPage )} style={
            isNormalPage && { cursor: 'pointer' }
        } onClick={handleClickNftItem} >
            {isNormalPage && <div className={clsx(styles.nftHeadInfo, 'flex', 'justify-between')}>
                {checkWhoOwned()}
                <p title={nftItem.owner_of}>{`#${nftItem.token_id}`}</p>
            </div>}
            <p className={styles.nftName} >{isMintPage ? nftItems[nftIndex].name : metaData.name}</p>
            <Image className={styles.nftImage} src={isMintPage ? nftItems[nftIndex].image : metaData.image} width={200} height={200} alt="Doge"  priority/>
            <p className={styles.nftDescription}>{isMintPage ? nftItems[nftIndex].description : metaData.description}</p>
        </div>
    );
}

export default NftItem;
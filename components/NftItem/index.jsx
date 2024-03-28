import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'
import Image from 'next/image';

NftItem.propTypes = {

};

function NftItem(props) {

    const nftData = [{
        name: 'PUG',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmZ4uHLzh35ufjFHHNbc7vAjuWmL7MWTKeARVzKsZoaJjY',
        description: 'Adorable Pug'
    }, {
        name: 'Shiba',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmdotT4u4Yq9UcgiWLZqoLPPnyn774Hsc2fqJtn6gWqHrw',
        description: 'Shiba Inu Awesome'
    }, {
        name: 'St.Benard',
        image: 'https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmeaE4MTmQaomEXffrKKE2PaVZFuaT34DxVYyVn6xL7BsW',
        description: 'St Bernard go ahead'
    }]


    const [nftIndex, setNftIndex] = useState(0)

    useEffect(() => {
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
    }, [])

    return (
        <div className={styles.nftItemContainer}>
            <p className={styles.nftName} >{nftData[nftIndex].name}</p>
            <Image className={styles.nftImage} src={nftData[nftIndex].image} width={200} height={200} alt="Doge" />
            <p className={styles.nftDescription}>{nftData[nftIndex].description}</p>
        </div>
    );
}

export default NftItem;
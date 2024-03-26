import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss'
import Image from 'next/image';

NftItem.propTypes = {

};

function NftItem(props) {
    return (
        <div className={styles.nftItemContainer}>
            <p className={styles.nftName} >PUG</p>
            <Image className={styles.nftImage} src='https://orange-historic-reptile-492.mypinata.cloud/ipfs/QmZ4uHLzh35ufjFHHNbc7vAjuWmL7MWTKeARVzKsZoaJjY' width={200} height={200} alt="Pug" />
            <p className={styles.nftDescription}>Adorable Pug</p>
        </div>
    );
}

export default NftItem;
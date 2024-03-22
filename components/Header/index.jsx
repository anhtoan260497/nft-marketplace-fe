import Link from 'next/link'
import { ConnectButton } from 'web3uikit'
import styles from './styles.module.scss'
import Image from 'next/image'

const Header = () => {
    return (
        <nav className={styles.headerContainer}>
            <Image className={styles.logo} src='https://storage.googleapis.com/opensea-static/Logos/OpenSea-Full-Logo%20(dark).svg' width={200} height={50} />
            <div className={styles.headerNavContainer}>
                <div className={styles.headerNav}>
                    <Link href='/' >Home</Link>
                    <Link href='/sell-page' >Sell NFT</Link>
                </div>

                <ConnectButton />
            </div>


        </nav>
    )
}

export default Header
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
    return (
        <nav className={styles.headerContainer}>
            <Image className={styles.logo} src='https://storage.googleapis.com/opensea-static/Logos/OpenSea-Full-Logo%20(dark).svg' width={200} height={50} />
            <div className={styles.headerNavContainer}>
                <div className={styles.headerNav}>
                    <Link href='/' >Home</Link>
                    <Link href='/sell-page' >Sell NFT</Link>
                </div>
            </div>
            <ConnectButton />


        </nav>
    )
}

export default Header
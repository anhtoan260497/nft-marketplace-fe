import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useState } from 'react'

const Header = () => {

    const [isActiveNav, setIsActiveNav] = useState(false)

    return (
        <div className={styles.headerContainerFluid}>
            <nav className={styles.headerContainer}>
                <Image className={styles.logo} src='https://storage.googleapis.com/opensea-static/Logos/OpenSea-Full-Logo%20(dark).svg' width={200} height={50} alt='logo' />
                <div className={styles.headerNavContainer}>
                    <div className={styles.headerNav}>
                        <Link href='/' >Home</Link>
                        <Link href='/mint-page'>Mint Doge NFT</Link>  
                        <Link href='/your-profile' >Your Profile</Link>
                    </div>
                </div>
                <ConnectButton />
            </nav>
            <nav className={styles.headerContainerMobile}>
                <div className={styles.logoContainer}>
                    <Image className={styles.logo} src='https://storage.googleapis.com/opensea-static/Logos/OpenSea-Full-Logo%20(dark).svg' width={200} height={50} alt='logo'/>
                    <FontAwesomeIcon style={{ width: '20px', position: "absolute", right: '10px', top: '10%', margin: "20px" }} icon={faBars} onClick={() => { setIsActiveNav(true) }} />
                </div>
                <div className={clsx(styles.headerNavContainer, isActiveNav && styles.activeHeaderNav)}>
                    <FontAwesomeIcon style={{ width: '20px', position: "relative", left: '45%', margin: "20px" }} icon={faXmark} onClick={() => { setIsActiveNav(false) }} />
                    <ConnectButton
                        className={styles.ConnectButton} showBalance={{
                            smallScreen: false,
                            largeScreen: false
                        }} accountStatus={{
                            smallScreen: 'avatar',
                            largeScreen: 'avatar',
                        }} />
                    <div className={styles.headerNav}>
                        <Link href='/' >Home</Link>
                        <Link href='/mint-page'>Mint Doge NFT</Link>  
                        <Link href='/your-profile' >Your Profile</Link>
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Header
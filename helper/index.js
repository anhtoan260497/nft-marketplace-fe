export const shortTxnHash = (hash) => {
    return `${hash.slice(0,4)}...${hash.slice(hash.length-4, hash.length)}`
}

export const shortPrice = (price) => {
    if(!price) return 0
    const number = parseFloat(price)
    return number.toFixed(3)
}

export const convertMetaData = (metadataString) => {
   return JSON.parse(metadataString)
}

export const getErrorMessageFromSolidity = (message) => {
    const index =  message.indexOf('Error')
    const indexEnd = message.indexOf('(')
    if(index < 0 || indexEnd < 0) return 'Error While Processing Transaction'
    return message.slice(index, indexEnd)
}


export const parsePriceToEther = (price) => {
    return price * 10 ** 18
}

export const scanExplorerUrl = (chainId, hash) => {
    if(chainId === 11155111) return `https://sepolia.etherscan.io/tx/${hash}`
}

export const chainNativeTokenSymbol = (chainId) => {
    if(chainId === 11155111) return 'ETH'
    if(chainId === 97) return 'BNB'
}
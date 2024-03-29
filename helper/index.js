export const shortTxnHash = (hash) => {
    return `${hash.slice(0,4)}...${hash.slice(hash.length-4, hash.length)}`
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
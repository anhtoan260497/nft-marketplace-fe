const { default: axios } = require("axios")

const getListedItems = async (chainId) => {
    const res = await axios.get(`https://cosmic-brightly-lobster.ngrok-free.app/list-item/${chainId}`)
    return res
}

export default getListedItems
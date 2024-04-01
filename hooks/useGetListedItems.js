const { default: getListedItems } = require("@/api/getListedItems")
const { QUERY_KEY } = require("@/constants")
const { useQuery } = require("@tanstack/react-query")

const useGetListedItems = (options, chainId) => {
    return useQuery({
        ...options,
        queryKey : [QUERY_KEY.GET_LISTED_ITEMS, chainId],
        queryFn : getListedItems(chainId)
    })
}

export default useGetListedItems
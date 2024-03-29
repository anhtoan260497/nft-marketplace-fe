const { useEffect, useState } = require("react")

const useRenderClient = () => {
    const [isClient, setisClient] = useState(false) // state for render run only on client

    useEffect(() => {
        setisClient(true)
    }, []) // useEffect for render only on client

    return isClient
}

export default useRenderClient
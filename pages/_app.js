import Header from "@/components/Header"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
    return (
        <MoralisProvider initializeOnMount={false}>
            <Header />
            <Component {...pageProps} />
        </MoralisProvider>
    )
}
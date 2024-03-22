import "./globals.css";
import { MoralisProvider } from "react-moralis";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> {children}</body>
    </html>
  );
}

import '../styles/globals.css'
import { createAppKit } from '@reown/appkit'

createAppKit({
  projectId: '962425907914a3e80a7d8e7288b23f62',
  chains: [
    {
      id: 1,
      name: 'Ethereum',
      rpcUrl: 'https://cloudflare-eth.com'
    }
  ],
  appearance: {
    theme: 'dark'
  }
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

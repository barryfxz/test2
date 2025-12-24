import '../styles/globals.css'
import { createAppKit } from '@reown/appkit'

const projectId = '962425907914a3e80a7d8e7288b23f62'

// Initialize AppKit ONCE
createAppKit({
  projectId,
  chains: [
    {
      id: 1,
      name: 'Ethereum',
      rpcUrl: 'https://cloudflare-eth.com'
    }
  ],
  appearance: {
    theme: 'dark',
    accentColor: '#22c55e',
    borderRadius: '16px'
  }
})

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}


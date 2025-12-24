import '@/styles/globals.css'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = '962425907914a3e80a7d8e7288b23f62'

/* Wagmi config */
const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  }
})

/* Reown adapter */
const wagmiAdapter = new WagmiAdapter({
  config: wagmiConfig
})

/* Create AppKit modal */
createAppKit({
  adapters: [wagmiAdapter],
  networks: [mainnet, sepolia],
  projectId,
  metadata: {
    name: 'Wallet Connect App',
    description: 'Next.js WalletConnect',
    url: 'http://localhost:3000',
    icons: ['https://walletconnect.com/walletconnect-logo.png']
  }
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

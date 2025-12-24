import '@/styles/globals.css'
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

const projectId = '962425907914a3e80a7d8e7288b23f62'

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [mainnet]
})

const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: wagmiAdapter.transports
})

const queryClient = new QueryClient()

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet],
  metadata: {
    name: 'WalletConnect Test',
    description: 'Sleek Wallet Connect UI',
    url: 'http://localhost:3000',
    icons: ['https://walletconnect.com/walletconnect-logo.png']
  }
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

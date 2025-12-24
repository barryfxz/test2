import '../styles/globals.css'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { w3mProvider, w3mConnectors } from '@web3modal/ethereum'
import { EthereumClient } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'

const projectId = '962425907914a3e80a7d8e7288b23f62'

const { chains, provider } = configureChains(
  [mainnet, sepolia],
  [w3mProvider({ projectId })]
)

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  provider
})

const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode="dark"
      />
    </WagmiConfig>
  )
}

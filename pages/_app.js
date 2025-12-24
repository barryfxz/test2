import { WagmiConfig, createClient } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'

const projectId = '962425907914a3e80a7d8e7288b23f62'
const chains = [mainnet]

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  provider: w3mProvider({ projectId, chains })
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={wagmiClient}
      />
    </>
  )
}

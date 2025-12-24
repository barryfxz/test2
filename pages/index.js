import { useAccount, useDisconnect, useNetwork } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'

export default function Home() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  return (
    <main style={{
      background: '#020617',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{
        border: '1px solid #1e293b',
        borderRadius: '18px',
        padding: '30px',
        width: '420px',
        textAlign: 'center'
      }}>
        <h2>WalletConnect Test</h2>

        {!isConnected ? (
          <button
            onClick={() => open()}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: '#22c55e',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <p style={{ marginTop: 12, color: '#22c55e' }}>
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </p>
            <p style={{ color: '#94a3b8' }}>
              Network: {chain?.name}
            </p>
            <button
              onClick={() => disconnect()}
              style={{
                marginTop: 16,
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: 'none',
                background: '#ef4444',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </main>
  )
}

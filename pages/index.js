import { useAccount, useDisconnect, useChainId } from 'wagmi'
import { useState } from 'react'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const [status, setStatus] = useState('')

  const connectWallet = async () => {
    try {
      setStatus('')
      await window.appkit.open()
    } catch (err) {
      console.error(err)
      setStatus('Connection failed')
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#020617',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>
      <div style={{
        width: '420px',
        padding: '32px',
        borderRadius: '18px',
        border: '1px solid #1e293b',
        textAlign: 'center'
      }}>
        <h2>Wallet Connection</h2>
        <p style={{ color: '#94a3b8' }}>
          Reown AppKit (WalletConnect)
        </p>

        {!isConnected ? (
          <button
            onClick={connectWallet}
            style={{
              marginTop: '20px',
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
            <div style={{ marginTop: '16px', color: '#22c55e' }}>
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            <div style={{ color: '#94a3b8', marginTop: '6px' }}>
              Chain ID: {chainId}
            </div>
            <button
              onClick={() => disconnect()}
              style={{
                marginTop: '16px',
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

        {status && (
          <div style={{
            marginTop: '14px',
            color: '#ef4444'
          }}>
            {status}
          </div>
        )}
      </div>
    </main>
  )
}

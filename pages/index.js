import { useState } from 'react'
import { useAccount, useDisconnect, useNetwork } from 'wagmi'
import { useWeb3Modal } from '@web3modal/react'

export default function Home() {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const connectWallet = async () => {
    try {
      setLoading(true)
      setStatus('')
      await open()
      setStatus('Connected successfully')
    } catch {
      setStatus('Connection failed')
    } finally {
      setLoading(false)
    }
  }

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
        <h2>Wallet Connection Test</h2>
        <p style={{ color: '#94a3b8' }}>
          Web3Modal v2 – Stable Build
        </p>

        {loading && (
          <div style={{
            width: '28px',
            height: '28px',
            margin: '20px auto',
            border: '3px solid #334155',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        )}

        {!isConnected ? (
          <button
            onClick={connectWallet}
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
            <div style={{ marginTop: '12px', color: '#22c55e' }}>
              Connected: {address.slice(0, 6)}...{address.slice(-4)}
            </div>
            <div style={{ color: '#94a3b8' }}>
              Network: {chain?.name}
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
            color: status.includes('failed') ? '#ef4444' : '#22c55e'
          }}>
            {status}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}

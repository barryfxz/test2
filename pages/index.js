import { useAccount, useDisconnect, useChainId } from 'wagmi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  return (
    <main
      style={{
        background: '#020617',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}
    >
      <div
        style={{
          border: '1px solid #1e293b',
          borderRadius: '18px',
          padding: '30px',
          width: '420px',
          textAlign: 'center',
          background: '#020617'
        }}
      >
        <h2 style={{ marginBottom: 20 }}>WalletConnect Test</h2>

        {!isConnected ? (
          <button
            onClick={() => window.appKit.open()}
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
            <p style={{ marginTop: 14, color: '#22c55e' }}>
              Connected:
              <br />
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>

            <p style={{ marginTop: 6, color: '#94a3b8' }}>
              Chain ID: {chainId}
            </p>

            <button
              onClick={() => disconnect()}
              style={{
                marginTop: 18,
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

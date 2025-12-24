import { useEffect, useState } from 'react'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    // Listen for successful connection
    window.addEventListener('appkit:connect', (e) => {
      setConnected(true)
      setAddress(e.detail.address)
    })

    return () => {
      window.removeEventListener('appkit:connect', () => {})
    }
  }, [])

  const connectWallet = () => {
    window.appkit.open()
  }

  return (
    <main className="container">
      <div className="card">
        <h2>Connect Wallet</h2>
        <p className="muted">500+ wallets supported via WalletConnect</p>

        {!connected ? (
          <button className="btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="success-box">
            <h3>Connected Successfully</h3>
            <p>{address?.slice(0, 6)}...{address?.slice(-4)}</p>
          </div>
        )}
      </div>
    </main>
  )
}

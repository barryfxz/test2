export default function Home() {
  const connectWallet = () => {
    window.appkit.open()
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#020617',
      color: '#fff'
    }}>
      <button
        onClick={connectWallet}
        style={{
          padding: '16px 24px',
          borderRadius: '14px',
          border: 'none',
          background: '#22c55e',
          fontWeight: 700,
          cursor: 'pointer'
        }}
      >
        Connect Wallet
      </button>
    </main>
  )
}

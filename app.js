const projectId = "962425907914a3e80a7d8e7288b23f62";

let provider;
let modal;

async function initWalletConnect() {
  provider = await window.EthereumProvider.init({
    projectId,
    chains: [1],
    showQrModal: false,
    methods: [
      "eth_sendTransaction",
      "eth_sign",
      "personal_sign",
      "eth_signTypedData"
    ],
    events: ["accountsChanged", "chainChanged"]
  });

  modal = new window.Web3Modal({
    projectId,
    walletConnectVersion: 2,
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent-color": "#6366f1",
      "--w3m-background-color": "#020617"
    }
  });

  // 🔑 THIS IS THE MISSING LINK
  provider.on("display_uri", (uri) => {
    modal.openModal({ uri });
  });

  provider.on("connect", async () => {
    const accounts = await provider.request({ method: "eth_accounts" });
    const address = accounts[0];

    document.getElementById("address").innerText =
      "Connected Address:\n" + address;

    document.getElementById("status").innerText =
      "Wallet connected successfully";

    modal.closeModal();
  });
}

async function connectWallet() {
  try {
    await provider.connect();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

(async () => {
  await initWalletConnect();

  document.getElementById("connectBtn").addEventListener("click", connectWallet);
})();

const projectId = "962425907914a3e80a7d8e7288b23f62";

let provider;
let wcModal;

async function initWalletConnect() {
  provider = await window.EthereumProvider.init({
    projectId,
    chains: [1],
    showQrModal: false
  });

  wcModal = new window.WalletConnectModal({
    projectId,
    chains: [1],
    themeMode: "dark",
    themeVariables: {
      "--wcm-accent-color": "#6366f1",
      "--wcm-background-color": "#020617"
    }
  });

  provider.on("display_uri", (uri) => {
    wcModal.openModal({ uri });
  });

  provider.on("connect", async () => {
    const accounts = await provider.request({ method: "eth_accounts" });
    const address = accounts[0];

    document.getElementById("address").innerText =
      "Connected Address:\n" + address;

    document.getElementById("status").innerText =
      "Wallet connected successfully";

    wcModal.closeModal();
  });
}

async function connectWallet() {
  await provider.connect();
}

(async () => {
  await initWalletConnect();
  document.getElementById("connectBtn").addEventListener("click", connectWallet);
})();

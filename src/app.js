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
    themeMode: "dark"
  });
}

async function connectWallet() {
  try {
    await provider.connect();

    const accounts = await provider.request({
      method: "eth_accounts"
    });

    const address = accounts[0];

    document.getElementById("address").innerText =
      "Connected Address:\n" + address;

    document.getElementById("status").innerText =
      "Wallet connected successfully";

  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await initWalletConnect();

  document.getElementById("connectBtn").addEventListener("click", async () => {
    await modal.openModal();
    await connectWallet();
  });
})();

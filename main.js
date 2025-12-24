import EthereumProvider from "@walletconnect/ethereum-provider";
import { Web3Modal } from "@web3modal/standalone";

const projectId = "962425907914a3e80a7d8e7288b23f62";

let provider;
let modal;
let isConnected = false;

async function init() {
  provider = await EthereumProvider.init({
    projectId,
    chains: [1],
    showQrModal: false
  });

  modal = new Web3Modal({
    projectId,
    standaloneChains: ["eip155:1"],
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent-color": "#6366f1",
      "--w3m-background-color": "#020617",
      "--w3m-border-radius-master": "20px"
    }
  });

  provider.on("display_uri", (uri) => {
    modal.openModal({ uri });
  });

  provider.on("connect", async () => {
    isConnected = true;

    const accounts = await provider.request({
      method: "eth_accounts"
    });

    // Show wallet address & success animation
    const addressEl = document.getElementById("address");
    const successEl = document.getElementById("success");

    addressEl.textContent = accounts[0];
    addressEl.classList.remove("hidden");
    successEl.classList.remove("hidden");

    // Change button state
    const btn = document.getElementById("connectBtn");
    btn.classList.add("connected");
    btn.querySelector(".btn-text").textContent = "Connected";

    modal.closeModal();
  });
}

// Button click triggers WalletConnect
document.getElementById("connectBtn").addEventListener("click", async () => {
  if (isConnected) return;
  const btn = document.getElementById("connectBtn");
  btn.classList.add("loading");
  await provider.connect();
  btn.classList.remove("loading");
});

await init();

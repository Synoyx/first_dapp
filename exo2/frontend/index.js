import { ethers } from "./ethers.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const sendAmount = document.getElementById("sendAmount");
const sendButton = document.getElementById("sendButton");
const withdrawAmount = document.getElementById("withdrawAmount");
const withdrawButton = document.getElementById("withdrawButton");
const balance = document.getElementById("balance");

let connectedAccount;

connectButton.addEventListener("click", async function () {
  if (typeof window.ethereum !== "undefined") {
    const resultAccount = await window.ethereum.request({ method: "eth_requestAccounts" });
    // Pour avoir l'adresse connectée au bon format (casse)
    connectedAccount = ethers.getAddress(resultAccount[0]);
    console.log(resultAccount);
    connectButton.innerHTML =
      "Connected with " + connectedAccount.substring(0, 4) + " ... " + connectedAccount.substring(connectedAccount.length - 4);

    await refreshBalance();
  } else {
    connectButton.innerHTML = "Please install metamask";
  }
});

sendButton.addEventListener("click", async function () {
  if (connectedAccount) {
    try {
      let sendAmountValue = sendAmount.value;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.sendEthers({ value: sendAmountValue });
      await transaction.wait();

      await refreshBalance();
    } catch (e) {
      console.log(e);
    }
  }
});

withdrawButton.addEventListener("click", async function () {
  if (connectedAccount) {
    try {
      let withdrawAmountValue = withdrawAmount.value;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.withdraw(withdrawAmountValue);
      await transaction.wait();

      await refreshBalance();
    } catch (e) {
      console.log(e);
    }
  }
});

async function refreshBalance() {
  if (connectedAccount) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const number = (await contract.getBalanceOfUser(connectedAccount)).toString();

      balance.innerHTML = number;
    } catch (e) {
      console.log(e);
    }
  }
}

/*
setNumber.addEventListener("click", async function () {
  if (connectedAccount) {
    try {
      let inputNumberByUser = inputNumber.value;
      const provider = new ethers.browseProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      let transaction = await contract.setMyNumber(inputNumberByUser);
      await transaction.wait();
    } catch (e) {
      console.log(e);
    }
  }
});
*/

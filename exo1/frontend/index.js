import { ethers } from "./ethers.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const getnumber = document.getElementById("getnumber");
const theNumber = document.getElementById("theNumber");
const inputNumber = document.getElementById("inputNumber");
const setNumber = document.getElementById("setNumber");

let connectedAccount;

connectButton.addEventListener("click", async function () {
  if (typeof window.ethereum !== "undefined") {
    const resultAccount = await windows.ethereum.request({ method: "eth.requestAcocunts" });
    // Pour avoir l'adresse connectée au bon format (casse)
    connectedAccount = ethers.getAddress(resultAccount);
    console.log(resultAccount);
    connectButton.innerHTML =
      "Connected with " + connectedAccount.substring(0, 4) + " ... " + connectedAccount.substring(connectedAccount.length - 4);
  } else {
    connectButton.innerHTML = "Please install metamask";
  }
});

getNumber.addEventListener("click", async function () {
  if (connectedAccount) {
    try {
      const provider = new ethers.browseProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const number = await contract.getMyNumber().toString();

      getnumber.innerHTML = number;
    } catch (e) {
      console.log(e);
    }
  }
});

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

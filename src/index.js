const { ethers } = require("ethers");
const NFT_CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

async function main() {
  // Import ABI
  // Define account and provider url
  const key =
    "0x0fee378084652fe22c311e73b1aa79f525e1f336cab5c108a16f6c1db5d92958";
  const provider_url = "https://polygon-rpc.com";
  const contract_address = "0xa6285dadd722ebd03dbde04ae0f9e6b032306662";
  // Create an instance with EtherJS
  console.log("Instancing new wallet...");
  const provider = new ethers.providers.JsonRpcProvider(provider_url);
  console.log("Provider created.");
  // Create a signer
  console.log("Creating signer...");
  let wallet = new ethers.Wallet(key).connect(provider);

  console.log("Signer created, address is: " + wallet.address);
  // Create contract connection
  console.log("Creating contract...");
  const contract = new ethers.Contract(
    contract_address,
    NFT_CONTRACT_ABI,
    wallet
  );
  let i = 1;
  let finished = false;
  while (!finished) {
    try {
      console.log("Asking owner...");
      const owner = await contract.ownerOf(i);
      console.log("Owner of token " + i + " is:", owner);
      document.body.innerHTML +=
        "Owner of token " + i + " is: " + owner + "<br>";
      i++;
    } catch (e) {
      finished = true;
    }
  }
}

main();

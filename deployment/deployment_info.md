# NFT42 Deployment

## Method Used
Deployed via Remix IDE (https://remix.ethereum.org)
Environment: Injected Provider - MetaMask

## Network
- Name : Ethereum Sepolia Testnet
- Chain ID : 11155111
- Explorer : https://sepolia.etherscan.io

## Deployed Contract
- Address : 0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041
- Name : NFT42
- Symbol : NFTK42
- Explorer : https://sepolia.etherscan.io/address/0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041

## Deployment Steps
1. Go to https://remix.ethereum.org
2. Create contracts/NFT42.sol and paste the code
3. Use the compiler version, OpenZeppelin dependency versions, optimizer and EVM settings from the verified deployment. The source requires Solidity >=0.8.20; imported dependencies can require a newer compiler. Reuse the verified sources/dependencies rather than resolving a different OpenZeppelin release during the defense.
4. Go to "Deploy & Run Transactions" tab
5. Environment → "Injected Provider - MetaMask"
6. Connect MetaMask on Sepolia Testnet
7. Contract → select "NFT42"
8. Click "Deploy" → confirm in MetaMask

## To Interact With the Deployed Contract
1. Go to https://remix.ethereum.org
2. Compile NFT42.sol
3. Environment → "Injected Provider - MetaMask"
4. In "At Address" → paste : 0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041
5. Click "At Address"

## Verification
Contract verified on Etherscan : Source Code Verified = Exact Match
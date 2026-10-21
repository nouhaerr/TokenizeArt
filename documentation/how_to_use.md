# How to Use NFT42

## Prerequisites

- MetaMask installed : https://metamask.io
- Ethereum Sepolia Testnet configured in MetaMask
- Sepolia ETH to pay gas fees

## View the NFT

### Via Etherscan
1. Go to https://sepolia.etherscan.io/address/0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041
2. Tab "Contract" → "Read Contract"
3. Call `tokenURI(0)` to see the metadata
4. Call `ownerOf(0)` to see the owner

### View the image directly
https://ipfs.io/ipfs/bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq

## Interact via Remix

1. Go to https://remix.ethereum.org
2. Open NFT42.sol and compile with Solidity 0.8.20
3. Environment → "Injected Provider - MetaMask"
4. "At Address" → 0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041
5. You can call all functions

## Available Functions

### Read (free)
- `ownerOf(tokenId)` — who owns this NFT
- `tokenURI(tokenId)` — metadata of the NFT
- `balanceOf(address)` — how many NFTs an address owns
- `name()` — contract name
- `symbol()` — contract symbol

### Write (costs gas)
- `mintNFT(to, uri)` — create a new NFT (owner only)
- `transferFrom(from, to, tokenId)` — transfer an NFT
- `approve(address, tokenId)` — authorize an address to transfer
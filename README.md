# TokenizeArt — NFT42

ERC-721 NFT deployed on Ethereum Sepolia Testnet.

## Technical Choices

- **Blockchain** : Ethereum Sepolia Testnet — official Ethereum testnet, stable and well supported
- **Standard** : ERC-721 — standard for non-fungible tokens (NFTs)
- **Language** : Solidity 0.8.20 — native language for EVM smart contracts
- **Deployment Tool** : Remix IDE — online IDE, simple and efficient
- **Library** : OpenZeppelin ERC721URIStorage — audited and secure contracts
- **Image Storage** : IPFS via Pinata — content-addressed storage, retained through pinning

## Why These Choices?

ERC-721 is the universal standard for NFTs — each token has a unique ID
and its own metadata. OpenZeppelin provides an audited and secure implementation.
Ethereum was chosen for its ERC-721 tooling and wallet support. Sepolia allows
public demonstrations without spending mainnet ETH. Solidity integrates directly
with the EVM and OpenZeppelin, while Remix makes deployment possible without
handling private keys in scripts. Other chains are possible, but would require
different tooling or wallet configuration.

IPFS identifies content by its CID. Availability depends on keeping the image
and metadata pinned; a CID alone does not guarantee permanent hosting.

## Contract Information

- **Name** : NFT42
- **Symbol** : NFTK42
- **Network** : Ethereum Sepolia Testnet (Chain ID: 11155111)
- **Contract Address** : `0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041`
- **Explorer** : https://sepolia.etherscan.io/address/0x65c6A0B1c7558a5A0A84B2c9A5832aa4f6443041
- **Token ID** : 0
- **Owner** : `0x5e5d721ffA48701ffb04c5A779e9314b9817da5B`

## NFT Image

- **IPFS Image** : `ipfs://bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq`
- **IPFS Metadata** : `ipfs://bafkreibp5fc5ors37rgrubmceal4ove7ankslhtp2wrepy7kszw62llvre`

## Features

- **On-chain bonus** : select “On-chain — SVG cake (bonus)” on the mint page to store a complete SVG image and JSON metadata in the contract. See [instructions and verification](documentation/onchain_bonus.md). Requires a new mint transaction; not yet recorded on-chain by this source change.

- `mintNFT(address, uri)` — Create a new NFT (owner only)
- `ownerOf(tokenId)` — Check the owner of an NFT
- `tokenURI(tokenId)` — Get the metadata of an NFT
- `transferFrom(from, to, tokenId)` — Transfer an NFT
- `approve(address, tokenId)` — Authorize an address to transfer an NFT


## Repository and Demo

- `code/`: Solidity ERC-721 contract.
- `deployment/`: Remix deployment instructions.
- `mint/`: mint website, IPFS preview and on-chain metadata builder.
- `documentation/`: usage, minting and on-chain verification instructions.
- `metadata.json` and `tokenizart.jpg`: public original metadata and artwork.

From the project root, run `python3 -m http.server 8000`, then open
http://localhost:8000/mint/. Keep MetaMask on Sepolia and use the contract
owner account to mint. Internet access is required for ethers.js, IPFS and Sepolia.
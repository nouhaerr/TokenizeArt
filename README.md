# TokenizeArt — NFT42

ERC-721 NFT deployed on Ethereum Sepolia Testnet.

## Technical Choices

- **Blockchain** : Ethereum Sepolia Testnet — official Ethereum testnet, stable and well supported
- **Standard** : ERC-721 — standard for non-fungible tokens (NFTs)
- **Language** : Solidity 0.8.20 — native language for EVM smart contracts
- **Deployment Tool** : Remix IDE — online IDE, simple and efficient
- **Library** : OpenZeppelin ERC721URIStorage — audited and secure contracts
- **Image Storage** : IPFS via Pinata — decentralized and permanent storage

## Why These Choices?

ERC-721 is the universal standard for NFTs — each token has a unique ID
and its own metadata. OpenZeppelin provides an audited and secure implementation.
IPFS ensures the image remains accessible even if a server goes down.

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

- `mintNFT(address, uri)` — Create a new NFT (owner only)
- `ownerOf(tokenId)` — Check the owner of an NFT
- `tokenURI(tokenId)` — Get the metadata of an NFT
- `transferFrom(from, to, tokenId)` — Transfer an NFT
- `approve(address, tokenId)` — Authorize an address to transfer an NFT
# NFT42 — Whitepaper

## Summary

NFT42 (NFTK42) is an ERC-721 non-fungible token deployed on Ethereum Sepolia Testnet.
It represents a unique image of a cake shaped as the number 42,
stored on IPFS and retained through pinning.

## What is an NFT?

An NFT (Non-Fungible Token) is a unique token on the blockchain.
Unlike ERC-20 tokens (fungible), each NFT is distinct
and has its own metadata and unique value.

## Problem Solved

This project demonstrates how to create a unique digital asset on a
public blockchain, with an image stored in a decentralized way on IPFS.

## Technical Architecture

- **ERC-721** : NFT standard, each token has a unique ID
- **ERC721URIStorage** : extension that stores the metadata URI per token
- **IPFS** : decentralized storage for the image and metadata
- **onlyOwner** : modifier that protects the mintNFT function

## NFT Details

| Parameter   | Value                                              |
|-------------|---------------------------------------------------|
| Name        | NFT42                                             |
| Symbol      | NFTK42                                            |
| Standard    | ERC-721                                           |
| Token ID    | 0                                                 |
| Owner       | 0x5e5d721ffA48701ffb04c5A779e9314b9817da5B        |

## Security

- **onlyOwner** : only the owner can mint new NFTs
- **_safeMint** : verifies the recipient can receive NFTs
- **IPFS** : changing image bytes changes their CID; continued availability requires pinning

## Network

- Network : Ethereum Sepolia Testnet
- Address : 0xB85aC5D01FC5160b76A3416A172e0F377c9De74d
- Explorer : https://sepolia.etherscan.io/address/0xB85aC5D01FC5160b76A3416A172e0F377c9De74d

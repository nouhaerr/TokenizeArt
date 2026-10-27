# How to Use NFT42

## Prerequisites

- MetaMask installed : https://metamask.io
- Ethereum Sepolia Testnet configured in MetaMask
- Sepolia ETH to pay gas fees

## View the NFT

### Via Etherscan
1. Go to https://sepolia.etherscan.io/address/0xB85aC5D01FC5160b76A3416A172e0F377c9De74d
2. Tab "Contract" → "Read Contract"
3. Call `tokenURI(0)` to see the metadata
4. Call `ownerOf(0)` to see the owner

### View the image directly
https://ipfs.io/ipfs/bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq

## Interact via Remix

1. Go to https://remix.ethereum.org
2. Open NFT42.sol and compile using the same compiler and dependency versions as the verified deployment (see deployment/deployment_info.md)
3. Environment → "Injected Provider - MetaMask"
4. "At Address" → 0xB85aC5D01FC5160b76A3416A172e0F377c9De74d
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

## Mint Through the Website

1. From the repository root, run `python3 -m http.server 8000`.
2. Open http://localhost:8000/mint/ in a browser with MetaMask.
3. Select IPFS for the original JPEG or On-chain for the embedded SVG bonus.
4. Connect the contract owner account on Sepolia. Other accounts cannot mint.
5. Click Mint NFT42, review the fees and confirm in MetaMask.
6. Record the transaction hash and token ID displayed after confirmation.

The site rechecks the account, network and contract owner before each mint.
Account/network changes require reconnection. Rejected requests and failed
transactions appear in the status box, and the button becomes available again.
After confirmation, the site reads `tokenURI` and `ownerOf` to verify the result.
If that read fails, inspect the confirmed transaction before retrying a mint.

The IPFS preview uses HTTPS gateways to load the image by CID. If both gateways
fail, the page displays an availability message; check that the content remains
pinned on Pinata. The NFT metadata continues to use its canonical `ipfs://` URI.

## Display the NFT in a Wallet

In a wallet supporting Sepolia NFTs, import the contract address and the token ID
from your confirmed mint transaction. Select Sepolia and verify the NFT appears
in the NFT tab. Wallet rendering support varies, especially for SVG data URIs.
Prepare a working wallet or marketplace view of the original NFT before the defense:
the website preview alone does not satisfy that evaluation requirement.

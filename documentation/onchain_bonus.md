# Bonus: On-chain Image and Metadata

## Usage

1. From the repository root, run `python3 -m http.server 8000`, then open http://localhost:8000/mint/.
2. Select **On-chain — SVG cake (bonus)** under **NFT storage**.
3. Check the 42 cake preview, then connect MetaMask on Sepolia.
4. Use the contract owner's account (the account that deployed it): only this account can call `mintNFT`.
5. Click **Mint NFT42**, review the fees, then confirm in MetaMask.
6. Save the confirmed transaction hash as evidence of the bonus.

The code is ready; the bonus NFT is only recorded on-chain once this transaction is confirmed.
Minting creates a new token without modifying the existing IPFS NFT.

## How It Works

`mint/onchain.js` contains a self-contained SVG illustration with no external resources.
Its content is encoded as `data:image/svg+xml;base64,...` and placed in the metadata's
`image` field. The complete JSON is encoded as
`data:application/json;base64,...` and passed to `mintNFT(to, uri)`.

The current `NFT42.sol` contract calls `_setTokenURI`, which saves this entire string
in contract storage. It therefore stores both the metadata and every byte of the SVG.
No new deployment is required if the deployed contract matches the repository's code.

The original JPEG remains available in IPFS mode. The bonus uses a new, compact SVG
illustration because storing the 222 KB JPEG through ERC721URIStorage would be too
expensive. Base64 is an encoding, not compression.

## Verify on the Blockchain

1. In the transaction logs, find the `Transfer` event from the zero address.
   Its `tokenId` identifies the new NFT; do not assume it is 0 or 1.
2. In Remix or Etherscan, call `tokenURI(tokenId)` on the contract.
3. Check that the returned value starts with `data:application/json;base64,`.
4. Decode the part after the comma. The JSON must contain an `image` field
   starting with `data:image/svg+xml;base64,`.
5. Decode this second payload. The result must be the complete cake SVG.

The local files prepare the mint. The value returned by the contract after the
transaction is confirmed provides evidence of on-chain storage.

Reference: https://docs.openzeppelin.com/contracts/5.x/erc721

The mint page displays the minted token ID and checks the returned metadata
against the submitted data URI. Save that transaction hash and token ID for the defense.

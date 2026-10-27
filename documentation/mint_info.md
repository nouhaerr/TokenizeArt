# NFT42 Mint

## Image
- Created on Canva — a cake shaped as the number 42
- Stored on IPFS via Pinata
- Image CID : bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq
- URL : ipfs://bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq
- View image : https://ipfs.io/ipfs/bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq

## Metadata
- Metadata CID : bafkreibp5fc5ors37rgrubmceal4ove7ankslhtp2wrepy7kszw62llvre
- URL : ipfs://bafkreibp5fc5ors37rgrubmceal4ove7ankslhtp2wrepy7kszw62llvre

## Minted NFT
- Token ID : 0
- Owner : 0x5e5d721ffA48701ffb04c5A779e9314b9817da5B
- Mint transactions : https://sepolia.etherscan.io/address/0xB85aC5D01FC5160b76A3416A172e0F377c9De74d#tokentxnsErc721

## How to Mint a New NFT
1. Open Remix IDE
2. Load the contract via "At Address" : 0xB85aC5D01FC5160b76A3416A172e0F377c9De74d
3. Call mintNFT with :
   - to : recipient address
   - uri : ipfs://[CID of the metadata JSON file]
4. Confirm in MetaMask

## Website Minting

From the repository root, run `python3 -m http.server 8000` and open
http://localhost:8000/mint/. Connect the original contract deployer account on
Sepolia. Select IPFS for the original image or On-chain for the SVG bonus, then
click Mint NFT42 and confirm in MetaMask. Only the contract owner can mint.

The confirmed transaction status shows the new token ID, owner and hash.
Use this token ID when calling `ownerOf` and `tokenURI`; do not assume it is 0.
See `documentation/onchain_bonus.md` for verification of the inscriptions bonus.

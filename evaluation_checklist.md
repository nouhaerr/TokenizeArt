# Defense Checklist

## Before the Defense

- Include all public source files, metadata and artwork in the submitted Git repository.
  Check `git status` and review your changes before committing and pushing.
- Keep API keys, passwords, wallet seed phrases and private keys out of the repository.
- Ensure the original image and metadata remain pinned on Pinata.
- Have MetaMask available on Sepolia with enough test ETH for deployment and minting.
- Confirm the artist login is `nerrakeb` and the artwork title contains `42`.
- Prepare a wallet or marketplace view displaying the actual NFT and its image.

## Mandatory Demonstration

1. Show the repository structure, README and technology choices.
2. Display the actual NFT in your wallet or a marketplace; the artwork contains 42.
3. Read `tokenURI(tokenId)` and show the metadata name and artist login.
4. Read `ownerOf(tokenId)` and compare it to your connected wallet address.
5. Explain the contract: the deployer becomes `owner`, only that account can mint,
   token IDs increase, `_safeMint` creates ownership and `_setTokenURI` stores the URI.
6. Deploy a fresh instance through Remix using the deployment instructions.
7. On that fresh instance, call `mintNFT` from its deployer account and retain the
   transaction hash. Read the token ID from the mint's `Transfer` event.
   The website is configured for the original contract; use Remix for this fresh instance.
8. Explain `approve`, `transferFrom` and `safeTransferFrom`. Transfer only to an
   address you intend to receive the NFT. Transfers change the token owner, not
   the contract owner authorized to mint.

## Bonus Demonstration

Only demonstrate bonuses once every mandatory requirement has passed.

1. Start the website as described in `how_to_use.md`, then mint through its interface.
2. Demonstrate missing wallet/wrong network errors and cancellation in MetaMask.
3. Switch accounts or networks: the site must require reconnection before minting.
4. Choose On-chain, check the SVG preview and mint a new token.
5. Record the displayed token ID and confirmed transaction hash.
6. Read `tokenURI` from the contract and decode its JSON and embedded SVG as
   described in `onchain_bonus.md`. Local preview files are not proof of on-chain storage.

## Evidence to Record After Real Transactions

Do not invent transaction hashes or mark pending steps as completed.

| Evidence | Value to record |
| --- | --- |
| Fresh deployment address and transaction | Fill after deployment during rehearsal/defense |
| Original NFT wallet/marketplace view | Prepare in your wallet/marketplace |
| Website mint transaction and token ID | Fill after confirmation |
| On-chain mint transaction and token ID | Fill after confirmation |

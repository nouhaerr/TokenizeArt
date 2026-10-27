const CONTRACT_ADDRESS = '0xB85aC5D01FC5160b76A3416A172e0F377c9De74d';
const IMAGE_CID = 'bafkreigdvkxu4exiwxofctwirkfen4sankr3nboviaurb2el3c73uut3yq';
const METADATA_CID = 'bafkreibp5fc5ors37rgrubmceal4ove7ankslhtp2wrepy7kszw62llvre';
const TOKEN_URI = 'ipfs://' + METADATA_CID;
const SEPOLIA_CHAIN_ID = '0xaa36a7';
const GATEWAYS = ['https://gateway.pinata.cloud/ipfs/', 'https://ipfs.filebase.io/ipfs/'];
const ABI = [
    'function mintNFT(address to, string uri)',
    'function owner() view returns (address)',
    'function ownerOf(uint256 tokenId) view returns (address)',
    'function tokenURI(uint256 tokenId) view returns (string)',
    'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];
const el = id => document.getElementById(id);
const metadataPreview = URL.createObjectURL(new Blob(
    [JSON.stringify(ONCHAIN_METADATA, null, 2)], { type: 'application/json' }
));
let gatewayIndex = 0;
let busy = false;
let connecting = false;
let sessionVersion = 0;
let connectedAddress;

// Try each gateway once. Never substitute a local image for IPFS content.
el('nftImage').addEventListener('error', () => {
    if (el('storageMode').value === 'onchain') return;
    gatewayIndex++;
    if (gatewayIndex < GATEWAYS.length) {
        el('nftImage').src = GATEWAYS[gatewayIndex] + IMAGE_CID;
    } else {
        el('imageError').hidden = false;
    }
});
el('nftImage').addEventListener('load', () => { el('imageError').hidden = true; });

function updatePreview() {
    const onchain = el('storageMode').value === 'onchain';
    gatewayIndex = 0;
    el('imageError').hidden = true;
    el('nftImage').src = onchain ? ONCHAIN_IMAGE_URI : GATEWAYS[0] + IMAGE_CID;
    document.querySelector('.nft-info span').textContent = onchain ? ONCHAIN_METADATA.name : 'NFT42 — Cake';
    el('metadataLink').href = onchain ? metadataPreview : GATEWAYS[0] + METADATA_CID;
    el('storageDescription').textContent = onchain
        ? 'The SVG image and metadata will be stored on Sepolia when you mint. Higher gas cost.'
        : 'Image and metadata hosted on IPFS.';
}

function showStatus(message, type = '') {
    el('status').textContent = message;
    el('status').className = 'status visible ' + type;
}

function errorMessage(error) {
    if (error.code === 4001 || error.code === 'ACTION_REJECTED') return 'Request cancelled in MetaMask.';
    if (error.code === 'INSUFFICIENT_FUNDS') return 'Not enough Sepolia ETH to pay the gas fees.';
    return error.shortMessage || error.reason || error.message || 'Unexpected wallet error.';
}

function renderWallet() {
    el('connectBtn').disabled = busy || connecting || Boolean(connectedAddress);
    el('connectBtn').textContent = connectedAddress ? '✅ Connected' : '🦊 Connect MetaMask';
    el('mintBtn').style.display = connectedAddress ? 'block' : 'none';
    el('mintBtn').disabled = busy || !connectedAddress;
    el('mintBtn').textContent = busy ? '⏳ Minting...' : '✨ Mint NFT42';
    el('storageMode').disabled = busy;
    el('walletInfo').textContent = connectedAddress ? '✅ Connected : ' + connectedAddress : '';
    el('walletInfo').className = 'wallet-info' + (connectedAddress ? ' visible' : '');
}

function resetWallet() {
    sessionVersion++;
    connectedAddress = undefined;
    renderWallet();
    showStatus('Wallet or network changed. Reconnect on Sepolia before minting.');
}

// Create a fresh signer and check authorization before every write.
async function walletSession(requestAccess = false) {
    if (!window.ethereum) throw new Error('MetaMask not detected. Please install MetaMask.');
    if (!window.ethers) throw new Error('Wallet library unavailable. Check your internet connection and reload.');
    const version = sessionVersion;
    const accounts = await window.ethereum.request({ method: requestAccess ? 'eth_requestAccounts' : 'eth_accounts' });
    if (!accounts.length) throw new Error('Connect your MetaMask account first.');
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId.toLowerCase() !== SEPOLIA_CHAIN_ID) throw new Error('Wrong network. Switch MetaMask to Sepolia Testnet.');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(accounts[0]);
    const address = await signer.getAddress();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const owner = await contract.owner();
    if (owner.toLowerCase() !== address.toLowerCase()) throw new Error('Only the account that deployed this contract can mint. Select that account in MetaMask.');
    if (version !== sessionVersion) throw new Error('Wallet changed during connection. Please reconnect.');
    return { contract, address };
}

async function connectWallet() {
    if (connecting || busy) return;
    connecting = true;
    renderWallet();
    try {
        const session = await walletSession(true);
        connectedAddress = session.address;
        showStatus('Wallet connected on Sepolia. You can now mint.', 'success');
    } catch (error) {
        connectedAddress = undefined;
        showStatus(errorMessage(error), 'error');
    } finally {
        connecting = false;
        renderWallet();
    }
}

async function mintNFT() {
    if (busy) return;
    busy = true;
    renderWallet();
    const tokenUri = el('storageMode').value === 'onchain' ? ONCHAIN_TOKEN_URI : TOKEN_URI;
    let receipt;
    try {
        const { contract, address } = await walletSession();
        if (!connectedAddress || address.toLowerCase() !== connectedAddress.toLowerCase()) {
            throw new Error('Wallet account changed. Reconnect before minting.');
        }
        showStatus('Confirm the mint transaction in MetaMask.');
        const tx = await contract.mintNFT(address, tokenUri);
        showStatus('Transaction sent. Waiting for confirmation… Hash: ' + tx.hash);
        receipt = await tx.wait();
        if (!receipt || receipt.status !== 1) throw new Error('Transaction failed. Check its status on Etherscan.');
        const transfer = receipt.logs.filter(log => log.address.toLowerCase() === CONTRACT_ADDRESS.toLowerCase())
            .map(log => { try { return contract.interface.parseLog(log); } catch { return null; } })
            .find(event => event && event.name === 'Transfer' && event.args.from === ethers.ZeroAddress);
        if (!transfer) throw new Error('Mint confirmed, but the token ID could not be read from its logs.');
        const tokenId = transfer.args.tokenId;
        showStatus('Mint confirmed! Token ID: ' + tokenId + '\nhttps://sepolia.etherscan.io/tx/' + receipt.hash, 'success');
        // Verify the submitted payload against contract storage, not the preview.
        const storedUri = await contract.tokenURI(tokenId);
        const owner = await contract.ownerOf(tokenId);
        if (storedUri !== tokenUri) throw new Error('Stored metadata differs from the submitted URI. Inspect tokenURI on Etherscan.');
        showStatus('Mint confirmed! Token ID: ' + tokenId + '\nOwner: ' + owner
            + '\nMetadata verified against contract storage.\nhttps://sepolia.etherscan.io/tx/' + receipt.hash, 'success');
    } catch (error) {
        showStatus((receipt && receipt.status === 1 ? 'Transaction confirmed; verification incomplete. ' : '')
            + errorMessage(error) + (receipt ? '\nhttps://sepolia.etherscan.io/tx/' + receipt.hash : ''), 'error');
    } finally {
        busy = false;
        renderWallet();
    }
}

if (window.ethereum && window.ethereum.on) {
    window.ethereum.on('accountsChanged', resetWallet);
    window.ethereum.on('chainChanged', resetWallet);
    window.ethereum.on('disconnect', resetWallet);
}
updatePreview();
renderWallet();

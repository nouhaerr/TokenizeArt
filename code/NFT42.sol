// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title NFT42
 * @dev Contrat ERC-721 pour créer un NFT unique avec le nombre 42
 *      Chaque token est unique et possède une URI pointant vers ses métadonnées IPFS
 *      Seul l'owner peut minter de nouveaux NFTs
 */
contract NFT42 is ERC721, ERC721URIStorage {

    // Adresse du propriétaire du contrat
    address public owner;

    // Compteur pour générer des IDs uniques pour chaque NFT
    uint256 private _tokenIdCounter;

    /**
     * @dev Modifier qui restreint l'accès à l'owner uniquement
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "NFT42: not owner");
        _;
    }

    /**
     * @dev Constructeur — définit le nom et symbole du NFT
     *      L'adresse qui déploie devient owner
     */
    constructor() ERC721("NFT42", "NFTK42") {
        owner = msg.sender;
        _tokenIdCounter = 0;
    }

    /**
     * @dev Mint un nouveau NFT vers une adresse avec ses métadonnées IPFS
     *      Réservé à l'owner uniquement
     * @param to Adresse qui recevra le NFT
     * @param uri URI IPFS pointant vers le fichier de métadonnées JSON
     */
    function mintNFT(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev Retourne l'URI des métadonnées d'un token
     * @param tokenId ID du token
     */
    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Vérifie si le contrat supporte une interface donnée
     */
    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
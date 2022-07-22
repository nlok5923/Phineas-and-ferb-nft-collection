// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PhineasAndFerb is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint public tokenCount;
    uint public limit = 3000;

    constructor() ERC721("PhineasAndFerb", "PNF") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://metadata-api-phineas-ferb.herokuapp.com/";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        tokenCount++;
        require(tokenCount <= limit, "Can't mint more than 3000 NFTs");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function updateTokenURI(uint _tokenId, string memory _tokenUri) public onlyOwner {
        _setTokenURI(_tokenId, _tokenUri);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}

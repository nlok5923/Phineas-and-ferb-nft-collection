import { useState, useEffect, createContext } from "react";
import { ethers } from 'ethers'
import NFTContractArtifact from '../Ethereum/PnF.json'
import MarketPlaceContractArtifact from '../Ethereum/MarketPlace.json'

export const UserContext = createContext("appContext");

const UserProvider = (props) => {

  const [NFTContract, setNFTContract] = useState(null);
  const [marketPlace, setMarketPlaceContract] = useState(null);
  const [address, setAddress] = useState('');

  const NFTContractAddress = "0x1839E94913533f4460F63412eDB24BAb14b6eB6b";
  const MarketPlaceContractAddress = "0x0eD9c6e16226ea13790348EDa7b9f0fDfcB87f4c";
  const _initEthers = async () => {
    let ethProvider = new ethers.providers.Web3Provider(window.ethereum);
    let NFTContractInstance = new ethers.Contract(NFTContractAddress, NFTContractArtifact.abi, ethProvider.getSigner(0));
    let MarketPlaceContractInstance = new ethers.Contract(MarketPlaceContractAddress, MarketPlaceContractArtifact.abi, ethProvider.getSigner(0));
    setNFTContract(NFTContractInstance);
    setMarketPlaceContract(MarketPlaceContractInstance);
  }
  
  const _initApp = async () => {
    if (window.ethereum === undefined) {
      // _raiseError();
      return;
    }
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(selectedAddress);
    if(selectedAddress !== '') {
      setAddress(selectedAddress);
     await _initEthers();
    }
    window.ethereum.on("accountsChanged", async ([newAddress]) => {
      if (newAddress === undefined) {
        return this._resetState();
      }
      const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(selectedAddress);
    })

  }
  
  return (
    // eslint-disable-next-line react/prop-types
    <UserContext.Provider value = {{ NFTContract, address, _initApp, marketPlace, NFTContractAddress, MarketPlaceContractAddress }}> {props.children} </UserContext.Provider>
  );
};

export default UserProvider;
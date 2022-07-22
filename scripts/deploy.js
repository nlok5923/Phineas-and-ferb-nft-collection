const hre = require("hardhat");

async function main() {
  const PhineasAndFerbContract = await hre.ethers.getContractFactory("PhineasAndFerb");
  const MarketContract = await hre.ethers.getContractFactory("MarketPlace");
  const PhineasAndFerb = await PhineasAndFerbContract.deploy();
  const MarketPlace = await MarketContract.deploy();

  await PhineasAndFerb.deployed();
  await MarketPlace.deployed();

  console.log("Phineas and ferb Contract deployed to:", PhineasAndFerb.address);
  console.log("Market place contract deployed to: ", MarketPlace.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

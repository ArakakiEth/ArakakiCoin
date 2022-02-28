const hre = require("hardhat");

async function main() {
  const ArakakiCoin = await hre.ethers.getContractFactory("ArakakiCoin");
  const arakakiCoin = await ArakakiCoin.deploy();

  await arakakiCoin.deployed();

  console.log("Arakaki Coin deployed to:", arakakiCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error({
      error: err,
    });

    process.exit(1);
  });

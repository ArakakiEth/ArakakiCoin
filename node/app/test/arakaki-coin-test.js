const {
  expect,
} = require("chai");

const {
  ethers,
} = require("hardhat");

describe("ArakakiCoin", () => {
  it("Owner shold have all coins at first", async () => {
    const arakakiCoinFactory = await ethers.getContractFactory("ArakakiCoin");
    const arakakiCoin = await arakakiCoinFactory.deploy();

    await arakakiCoin.deployed();

    expect(await (async () => {
      const owner = await ethers.getSigner();
      const ownerBalance = await arakakiCoin.balanceOf(owner.address);

      return ownerBalance;
    })()).to.equal("285311670611000000000000000000");
  });

  it("should be drippable only once", async () => {
    const arakakiCoinFactory = await ethers.getContractFactory("ArakakiCoin");
    const arakakiCoin = await arakakiCoinFactory.deploy();

    await arakakiCoin.deployed();

    expect(await (async () => {
      const signers = await ethers.getSigners();
      const dripper = signers[1];

      try {
        for (let count = 0; count < 10; count++) {
          await arakakiCoin.connect(dripper).drip();
        }
      } catch (error) {
      }

      const dripperBalance = await arakakiCoin.balanceOf(dripper.address);

      return dripperBalance;
    })()).to.equal("1000000000000000000000");
  });

  it("should care about dripper count max", async () => {
    const arakakiCoinFactory = await ethers.getContractFactory("ArakakiCoin");
    const arakakiCoin = await arakakiCoinFactory.deploy();

    await arakakiCoin.deployed();

    expect(await (async () => {
      const dripperCountMax = await arakakiCoin.getDripperCountMax();
      const signers = await ethers.getSigners();

      for (const dripper of signers) {
        try {
          await arakakiCoin.connect(dripper).drip();
        } catch (error) {
          const dripperCount = await arakakiCoin.getDripperCount();

          return dripperCount.eq(dripperCountMax);
        }
      }

      return false;
    })()).to.equal(true);
  });
});


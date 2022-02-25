const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PegPrice", function () {


  it("Should push round data", async function () {
    const FeedStorage = await ethers.getContractFactory("PegPrice");
    const storage = await FeedStorage.deploy("GTON Peg", 6, 1);

    await storage.deployed();
    // let oracles = [];
    // for (let index = 0; index < 10; index++) {
    //   const [oracle] = await ethers.getSigners();
    //   oracles.push(oracle);
    //   console.log(oracle.address);
    // }
    const [oracle1, oracle2, oracle3, oracle4, oracle5] = await ethers.getSigners();

    expect(await storage.oracles()).to.deep.equal([]);
    await storage.addOracles([oracle1.address, oracle2.address, oracle3.address, oracle4.address, oracle5.address]);
    console.log("oracles ", await storage.oracles());
    // array.forEach(element => {

    // });
    console.log("oracle 1 push ", oracle1.address);
    await storage.connect(oracle1).pushData(101010);
  });

  it("Should push round data by one oracle", async function () {
    const FeedStorage = await ethers.getContractFactory("PegPrice");
    const storage = await FeedStorage.deploy("GTON Peg", 6, 1);

    await storage.deployed();

    const [oracle1] = await ethers.getSigners();

    expect(await storage.oracles()).to.deep.equal([]);
    await storage.addOracles([oracle1.address]);
    console.log("oracles ", await storage.oracles());
    // array.forEach(element => {

    // });
    console.log("oracle 1 push ", oracle1.address);
    await storage.connect(oracle1).pushData(101010);
    let round = await storage.latestRoundData();
    console.log(round);
    // expect(await storage.greet()).to.equal("Hola, mundo!");
  });

});

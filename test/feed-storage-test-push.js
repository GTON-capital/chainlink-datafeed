const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FeedStorage", function () {


  it("Should push round data", async function () {
    const FeedStorage = await ethers.getContractFactory("FeedStorage");
    const storage = await FeedStorage.deploy("Hello, world!", 10, 1, 2000);

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
    await storage.connect(oracle1).pushRoundData(1, 10);
    console.log("oracle 2 push ", oracle2.address);
    await storage.connect(oracle2).pushRoundData(1, 10);
    console.log("oracle 3 push");
    await storage.connect(oracle3).pushRoundData(1, 10);
    console.log("oracle 4 push");
    await storage.connect(oracle4).pushRoundData(1, 15);
    console.log("oracle 5 push");
    await storage.connect(oracle5).pushRoundData(1, 10);
    let round = await storage.latestRoundData();
    console.log(round);
    // expect(await storage.greet()).to.equal("Hola, mundo!");
  });

});

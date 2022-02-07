const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FeedStorage", function () {


  it("Should return the new feed name", async function () {
    const FeedStorage = await ethers.getContractFactory("FeedStorage");
    const storage = await FeedStorage.deploy("GTON/USD", 10, 1, 2000);
    await storage.deployed();

    expect(await storage.feed_name()).to.equal("GTON/USD");
  });

  it("Should add and delete oracles", async function () {
    const FeedStorage = await ethers.getContractFactory("FeedStorage");
    const storage = await FeedStorage.deploy("Hello, world!", 10, 1, 2000);
    await storage.deployed();
    expect(await storage.oracles()).to.deep.equal([]);
    await storage.addOracles(["0x725f73eB9283f6ECBd1daEE42bf3138F0ae63Eea", "0x98cfA15E3C94b7BC85C68D531DbEd68802c49fcc"]);
    expect(await storage.oracles()).to.deep.equal(["0x725f73eB9283f6ECBd1daEE42bf3138F0ae63Eea", "0x98cfA15E3C94b7BC85C68D531DbEd68802c49fcc"]);
    await storage.removeOracles(["0x725f73eB9283f6ECBd1daEE42bf3138F0ae63Eea"]);
    expect(await storage.oracles()).to.deep.equal(["0x98cfA15E3C94b7BC85C68D531DbEd68802c49fcc"]);

    // expect(await storage.greet()).to.equal("Hola, mundo!");
  });


});

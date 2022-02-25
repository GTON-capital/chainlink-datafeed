async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Authorize oracles with the account with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Feed = await ethers.getContractFactory("FeedStorage");
    //0x10739AA10D003e7C4B2c2270779ACB9E0B26d0fA
    const feed = await Feed.attach("0x041D7FC5afCf9dCa535769782B80b58370C8F874");
    //const token = await Token.deploy("GTON/USD", 10, 1, 2000);
    //const addres = await feed.removeOracles(["0x2410934e9aADc260092272EAB3D361482E65A77C"]);
    //0x0d67Ea37eCb2D716cf81fC57c03F94C988DeEd45
    //const res3 = await feed.addOracles(["0x0d67Ea37eCb2D716cf81fC57c03F94C988DeEd45"]);
    // // console.log("Res:", res3);

    const res2 = await feed.oracles();
    console.log("Res:", res2);
    const res = await feed.latestRoundData();
    console.log("Res:", res);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Authorize oracles with the account with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Feed = await ethers.getContractFactory("FeedStorage");
    //0x10739AA10D003e7C4B2c2270779ACB9E0B26d0fA
    const feed = await Feed.attach("0x041D7FC5afCf9dCa535769782B80b58370C8F874");
    //const token = await Token.deploy("GTON/USD", 10, 1, 2000);
    // const res = await feed.addOracles(["0x8571dc5158955491eb887f448b5369449bcbb44a"]);
    // const res3 = await feed.removeOracles(["0x10739AA10D003e7C4B2c2270779ACB9E0B26d0fA"]);
    // console.log("Res:", res3);

    // const res2 = await feed.oracles();
    // console.log("Res:", res2);
    const res = await feed.latestRoundData();
    console.log("Res:", res);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
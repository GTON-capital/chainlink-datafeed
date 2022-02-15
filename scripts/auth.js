async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Authorize oracles with the account with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Feed = await ethers.getContractFactory("FeedStorage");
    //0x10739AA10D003e7C4B2c2270779ACB9E0B26d0fA
    const feed = await Feed.attach("0x2e4b44c45E081E5C200250Ae8f8f18876D49A555");
    //const token = await Token.deploy("GTON/USD", 10, 1, 2000);
    //const res = await feed.addOracles(["0x09275Efe9752C094E52835A2cc89CFF9125eA135"]);
    //const res = await feed.removeOracles(["0xca10Bb5fF4D02EDb353FB07a8ceCef81aFE92465"]);
    //console.log("Res:", res);

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
//0x2e4b44c45E081E5C200250Ae8f8f18876D49A555
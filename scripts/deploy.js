async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Storage = await ethers.getContractFactory("FeedStorage");
    const storage = await upgrades.deployProxy(Storage, ["GTON/USD", 10, 1, 2000], { initializer: 'initialize' });

    //const token = await Token.deploy("GTON/USD", 10, 1, 2000);

    console.log("Contract address:", storage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);

    function description() external view returns (string memory);

    function version() external view returns (uint256);

    // getRoundData and latestRoundData should both raise "No data present"
    // if they do not have data to report, instead of returning unset values
    // which could be misinterpreted as actual reported values.
    function getRoundData(uint80 _roundId)
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );

    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract PegPrice is Initializable, Ownable {
    string private _description;
    uint8 private _decimals;
    uint256 private _version;

    uint80 private _roundId;
    int256 private _answer;
    uint256 private _startedAt;
    uint256 private _updatedAt;
    uint80 private _answeredInRound;


    address[] internal authorized_oracles;
    
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function description() public view returns (string memory) {
        return _description;
    }

    function version() public view returns (uint256) {
        return _version;
    }

    function getRoundData(uint80 _roundId)
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        

        return (_roundId, _answer,_startedAt,_updatedAt, _answeredInRound );
    }

    function latestRoundData()
        public
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return getRoundData(_roundId);
    }

    function checkOracle() private {
        uint256 i = 0;
        while (authorized_oracles[i] != msg.sender) {
            i++;
        }
        if (i >= authorized_oracles.length) {
            revert("unauthorized sender");
        }
    }

    function findValue(address value) private returns (uint256) {
        uint256 i = 0;
        while (authorized_oracles[i] != value) {
            i++;
        }
        return i;
    }

    function removeByValue(address value) private {
        uint256 i = findValue(value);
        removeByIndex(i);
    }

    function removeByIndex(uint256 i) private {
        while (i < authorized_oracles.length - 1) {
            authorized_oracles[i] = authorized_oracles[i + 1];
            i++;
        }
        delete authorized_oracles[authorized_oracles.length - 1];
        //authorized_oracles.length--;
    }

    function removeOracles(address[] memory candidates) public onlyOwner {
        for (uint256 i = 0; i < candidates.length; i += 1) {
            //for loop example
            removeByValue(candidates[i]);
        }
        authorized_oracles.pop();
    }

    function addOracles(address[] memory candidates) public onlyOwner {
        for (uint256 i = 0; i < candidates.length; i += 1) {
            //for loop example
            authorized_oracles.push(candidates[i]);
        }
    }

    function initialize(
        string memory _desc,
        uint8 _dec,
        uint256 _ver
    ) public payable initializer {
        console.log("Deploying a FeedStorage with name:", _desc);
        _description = _desc;
        _version = _ver;
        _decimals = _dec;
    }

    constructor(
        string memory _desc,
        uint8 _dec,
        uint256 _ver
    ) {
        initialize(_desc, _dec, _ver);
    }

    function feed_name() public view returns (string memory) {
        return _description;
    }

    function oracles() public view returns (address[] memory) {
        return authorized_oracles;
    }

    function pushData(int256 value) public {
        checkOracle();
        _answer = value;
        _roundId = _roundId + 1;
        _startedAt = _startedAt + 1;
        _updatedAt = _updatedAt + 1;
        _answeredInRound = 1;
    }
}

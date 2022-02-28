// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ArakakiCoin is ERC20 {
    address owner;

    uint256 private _dripAmount = 1000;
    uint256 private _dripperCount = 0;
    uint256 private _dripperCountMax = 5;

    mapping(address => bool) private _drippers;

    constructor() ERC20("Arakaki Coin", "ARKC") {
        owner = msg.sender;

        uint256 month = 11;
        uint256 dayOfMonth = 11;

        uint256 initialSupply = (month ** dayOfMonth) * (10 ** decimals());

        _mint(owner, initialSupply);
    }

    function drip() public {
        uint256 amount = _dripAmount * (10 ** decimals());

        require(checkAlreadyDripped(msg.sender) == false, "This account has already dripped.");

        require(_dripperCountMax > getDripperCount(), "Drips has been reached its limit.");

        _approve(owner, msg.sender, amount);

        transferFrom(owner, msg.sender, amount);

        _drippers[msg.sender] = true;

        _dripperCount = _dripperCount + 1;
    }

    function getDripAmount() public view returns (uint256) {
        return _dripAmount;
    }

    function setDripAmount(uint256 newDripAmount) public {
        require(msg.sender == owner, "This function should be called by owner.");

        _dripAmount = newDripAmount;
    }

    function getDripperCountMax() public view returns (uint256) {
        return _dripperCountMax;
    }

    function getDripperCount() public view returns (uint256) {
        return _dripperCount;
    }

    function increaseDripperCountMax(uint256 dripperCountToIncrease) public {
        require(msg.sender == owner, "This function should be called by owner.");

        _dripperCountMax = _dripperCountMax + dripperCountToIncrease;
    }

    function checkAlreadyDripped(address dripperAddress) public view returns (bool) {
        return _drippers[dripperAddress] == true;
    }
}


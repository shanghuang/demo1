// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./contracts/token/ERC20/ERC20.sol";

contract SimpleStorage is ERC20{
  uint storedData;

  event UpdateValue();

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }

  function set(uint x) public {
    storedData = x;
    emit UpdateValue();
  }

  function get() public view returns (uint) {
    return storedData;
  }
}

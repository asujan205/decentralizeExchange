 // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.4;

  import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

  contract Exchange is ERC20 {

    address public  owner;
    constructor ( address _owner) ERC20("Exchange", "EXC") {

        require(_owner != address(0), "ERC20: mint to the zero address");
      owner = _owner;
    }

   function getReverse () public view returns(uint){
    return ERC20(owner).balanceOf(address(this));
   }

  }
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
    function addLiquidity(uint _amount) public payable returns (uint){
      uint liquidity;
      uint ethbalance = address(this).balance;
      uint reverse = getReverse();
      ERC20 token = ERC20(owner);
    
    if(reverse == 0){
              token.transferFrom(msg.sender, address(this), _amount);
              liquidity = ethbalance;
              _mint(msg.sender, liquidity);


    }
    else{
      uint ethreverse = ethbalance- msg.value;
      uint tokenamount = (msg.value * reverse)/ethreverse;
      require(tokenamount <= _amount, "not enough token");
      token.transferFrom(msg.sender, address(this), tokenamount);
      liquidity = msg.value*totalSupply()/ethreverse;
      _mint(msg.sender, liquidity);
    }
    return liquidity;
    }

  }
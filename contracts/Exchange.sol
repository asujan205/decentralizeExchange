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

    function removeLiquidity(uint _amount ) public returns(uint, uint){
      require(_amount > 0, "amount must be greater than 0");
      uint ethreverse = address(this).balance;
      uint _totalSupply = totalSupply();
      uint ethamount = (_amount * ethreverse)/_totalSupply;
      uint tokenamount = (_amount * getReverse())/_totalSupply;
      _burn(msg.sender, _amount);
      payable(msg.sender).transfer(ethamount);
      ERC20(owner).transfer(msg.sender, tokenamount);
      return (ethamount, tokenamount);
    }

    function getAmountoftoken(uint256 inputamount,
    uint256 inputreserve,
    uint256 outputreverse
    ) public pure returns (uint256)
     {  
      require(inputreserve > 0 && outputreverse > 0, "invalid reserve");
      uint256 inputamountwithfee = inputamount * 99;
      uint256 numerator = inputamountwithfee * outputreverse;
      uint256 denominator = (inputreserve * 100) + inputamountwithfee;
      return numerator / denominator;

    }

    function ethToToken (uibr _minTokens) public payable{
      uint256 tokenReverse = getReverse();
      uint256 tokenBought = getAmountoftoken(msg.value, address(this).balance - msg.value, tokenReverse);
      require(tokenBought >= _minTokens, "token bought is less than min token");
      ERC20(owner).transfer(msg.sender, tokenBought);
    }


    function tokenToEth(uint256 _tokenAmount, uint256 _minEth) public {
      uint256 tokenReverse = getReverse();
      uint256 ethBought = getAmountoftoken(_tokenAmount, tokenReverse, address(this).balance);
      require(ethBought >= _minEth, "eth bought is less than min eth");
      ERC20(owner).transferFrom(msg.sender, address(this), _tokenAmount);
      payable(msg.sender).transfer(ethBought);
    }





  }
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BuyMeCoffee {

    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier ownerOnly {
       require(msg.sender == owner, "Owner only function");
       _;
   }

    function getBalance() public view ownerOnly returns(uint){
        return address(this).balance;
    }

    // * receive function
    receive() external payable {}

    // * fallback function
    fallback() external payable {}

    function buy() external payable {
        require(msg.value >= 1 ether, "Must send at least one Ether");
    }

    function withdraw() public ownerOnly {
        (bool success, ) = owner.call{ value: address(this).balance }("");
        require(success , "Failed to do withdrawal");
        emit Withdrawal(address(this).balance, block.timestamp);
    }
}

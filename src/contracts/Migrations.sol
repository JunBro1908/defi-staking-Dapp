pragma solidity ^0.5.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    constructor() public {
        owner = msg.sender;
    }
    // by using constructor we define owner as msg.sender who accessed in the contract
    modifier restricted() {
        if (msg.sender == owner) _;
    }
    /* if the person who currently connect with the contract is the same person 
    (owner address), the function will be continue */

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
    /* store the last num of the migration which executed at the last_completed_migration
    then truffle read this value and decide which migration should be strarted and which migration is deployed */

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration); 
    }
    /* if we upgrade migration then we put new address and also we bring the last_completed_migration to trace
    the last deployed migration */
}
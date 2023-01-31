pragma solidity ^0.5.0;
import './RWD.sol';
import './MBR.sol';
// get other contracts by using import

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    MBR public mbr;
    RWD public rwd;
    uint public totalStaken;
    // define tehter and rwd variables as public var

    address[] public historyAddress;
    uint256[] public historyAmount;
    uint[] public historyType;

    address[] public stakers;
    // who staked

    mapping (address => uint256) public stakingHistory;
    // to track the coin staking history

    mapping (address => uint256) public stakingBalance;
    // to track the amount of staking tokens according to the addresses

    mapping (address => bool) public hasStaked;
    // to track whether have staked or have not

    mapping (address => bool) public isStaking;
    // to track customer is staking or not currently

    constructor(RWD _rwd, MBR _mbr) public {
        rwd = _rwd;
        mbr = _mbr;
        // define _rwd and _mbr argument as var / each rwed and mbr
        owner = msg.sender;
        //to control who give rwd tokens
    }

    function depositTokens(uint _amount) public {
        // when user want to stake their tokens, use this function 
        
        require(_amount > 0,'amount can not be less than 0');
        // - or 0 amount can not stake

        mbr.transferFrom(msg.sender, address(this), _amount);
        /* msg.sender:customer, address(this):decentralBank address, amount of money 
        the third party is needed thus we use transferFrom function from MBR contract*/
        stakingBalance[msg.sender] += _amount;
        // update stakingBalance, plus how customer allow to transfer staking tokens

        // if msg.sender is the first staking time, we record it
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
            // we pusth msg.sender address to the array(stakers)
        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
        // set the value true

        historyAddress.push(msg.sender);
        historyAmount.push(_amount);
        historyType.push(0);
    }

    //rwd token for staking
    function issueTokens() public {
        require(msg.sender == owner, 'caller must be the owner');
        // only owner can control rwd tokens

        for (uint i=0; i<stakers.length; i++) {
        // repeat until number of stakers
            address recipient = stakers[i];
            // get ith staker's address
            uint balance = stakingBalance[recipient] / 10;
            // use balance variable as amount of how much they staked divided with 9 
            if(balance >0) {
            rwd.transfer(recipient, balance);
            // staker's address and amount of rwd tokens
            }
            // only transfer over zero because of gas fee
        }

    }
    
    function unstakeTokens(uint _amount) public {
        uint balance = stakingBalance[msg.sender];
        // get how much customer staked

        require(balance >= _amount, 'staking balance cannot be less than the amount of unstake');
        // if balance is less than zero we do not need to transfer
        
        mbr.transfer(msg.sender, _amount);
        // to customer, about amount

        stakingBalance[msg.sender] -= _amount;
        // record amount of unstake

        if(stakingBalance[msg.sender] == 0) {
        isStaking[msg.sender] = false;
        // change the state of currently staking
        }

        historyAddress.push(msg.sender);
        historyAmount.push(_amount);
        historyType.push(1);
    }

    // unstake all version
    function unstakeTokensall() public {
        uint balance = stakingBalance[msg.sender];
        // get how much customer staked

        require(balance > 0, 'staking balance cannot be less than zero');
        // if balance is less than zero we do not need to transfer
        
        mbr.transfer(msg.sender, balance);
        // to customer, about balance

        stakingBalance[msg.sender] = 0;
        // how abount customer can choose amount of unstake?

        isStaking[msg.sender] = false;
        // change the state of currently staking

        historyAddress.push(msg.sender);
        historyAmount.push(balance);
        historyType.push(1);
    }

    function getTotalstaken() public returns(uint) {

        for (uint i=0; i<stakers.length; i++) {
        // repeat until number of stakers
            address recipient = stakers[i];
            // get ith staker's address
            totalStaken += stakingBalance[recipient];
            }
        return totalStaken;
    }

    function getStakers() public view returns(address[] memory) {
        return stakers;
    }

    function getAddress() public view returns(address[] memory) {
        return historyAddress; 
    }

    function getAmount() public view returns(uint[] memory) {
        return historyAmount; 
    }

    function getType() public view returns(uint[] memory) {
        return historyType; 
    }
}
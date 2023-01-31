pragma solidity ^0.5.0;
//this is the contract that define the mock token

contract MBR {
    string public name = 'Mock MBR Token';
    string public symbol = 'USDT';
    uint256 public totalSupply = 1000000000000000000000000;
    //one million coin
    uint256 public decimals = 18;
/* in solidity as you know, we can not use float type. 
alternatively we use a decimals option that makes decimal to positive integer
forexample, in this case we can use 18 decimal place by interpret 5.23.. to 523.. */

/* event option makes us enable to see the variable not using memory 
thus it is effective way in the sense that it spend low gas fee
we often use event option with emit option in the function*/
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
/* we put the 'indexed' when we want to find and extract the value what we want 
from the set of events*/

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

/* mapping is similar to dictionary. we map the address to integer so it is convenience to
find the budget of the address  */
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
/* mapping to mapping, we use this to define how amount of money A allow B to use */

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
        /*msg.sender indicates that a person who execute the contract
        so we connect amount of coin(totalSupply) to the address of the person's wallet*/
    }
/* constructor is the function that initializes the state of the contract */

/* we need the address to transger whom and how much we will transfer. and as a result 
we return the bool type value which show us success or fail */
    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        //to transfer, a person who send the money must have a budget more than the amount of money which be sent
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
         // after the transfer, + and - caculation
        emit Transfer(msg.sender, _to, _value);
        // emit the value which we define at an event
        return true;
    }

/* function approve allows Bob to use the money of Alice and Alice confirm how much money Bob can transfer */
    function approve(address _spender, uint _value) public returns(bool success) {
        //a subject(msg.sender) who execute approve is Alice 
        allowance[msg.sender][_spender] = _value;
        // msg.sender(Alice)-_spender(Bob)-amount(money allocation)        emit Approval(msg.sender,_spender,_value);
        return true;
    }

/*function transferfrom allow Bob to transfer Alice's money to a person whom Bob chose */
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        // _from = Alice must have the money more than she allowed
        require(allowance[_from][msg.sender] >= _value);
        /* _from = Alice msg.sender = Bob(subject who execute the transferfrom function)
        the money which Bob transfer must be less than the allowance */
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        // we also caculate the allowance. Bob can not transfer more than Alice confirm.
        emit Transfer(_from,_to,_value);
        //emit the event value
        return true;
    }

}



pragma solidity ^0.5.0;

contract RWD {
    string public name = 'Reward Token';
    string public symbol = 'RWD';
    uint256 public totalSupply = 1000000000000000000000000;
    uint256 public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        // 지갑 주인이 허용한 양 값 입력 msg.sender:앨리스 _spender:밥 승인 실행 주체는 앨리스임
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        // _from:앨리스 msg.sender:밥 transferfrom 실행 주체는 밥이라서
        balanceOf[_to] += _value;
        balanceOf[_from] -= _value;
        allowance[_from][msg.sender] -= _value;
        // 허용한 양의 수에서 제거
        emit Transfer(_from,_to,_value);
        return true;
    }

}



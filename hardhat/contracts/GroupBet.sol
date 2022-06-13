// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2; 
 
contract GroupBet{

    struct Bet {
        uint target;
        uint amount;
    }
    uint constant NUM_TARGET = 2;
    uint storedData;
    //mapping(address => Bet) private _bet;
    address[] players;                   //mapping doesn't support looping over
    address initiator;
    mapping(address => Bet) _bet;
    event BetReceived(uint amount, uint256 contractBalance);   //bet amount, current contract balance

    constructor(string memory name, string memory symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)

    }

    function getInitiator() public view returns(address){
        return initiator;
    }

    function setAsInitiator() public {
        initiator = msg.sender;
    }

    function setInitiator(address _initiator) public {
        initiator = _initiator;
    }

    function bet(uint x) public payable{
        _bet[msg.sender] = Bet({target: x, amount:msg.value});
        players.push(msg.sender);
        emit BetReceived(_bet[msg.sender].amount, address(this).balance);
    }

    function draw(uint winner) public payable{
        uint    sum=0;
        uint[] memory targetSum = new uint[](NUM_TARGET); 
        //?how to init arary to 0
        for (uint i=0; i<NUM_TARGET; i++) {
            targetSum[i] = 0;
        }
        for (uint i=0; i<players.length; i++) {
            Bet memory playerBet = _bet[players[i]];
            sum += playerBet.amount;
            targetSum[playerBet.target] += playerBet.amount;
        }
        uint winSum = targetSum[winner];

        for(uint i=0;i<players.length; i++){
            Bet memory playerBet = _bet[players[i]];
            if(playerBet.target == winner){
                uint val = playerBet.amount * sum / winSum;
                //transfer tp winner

                (bool sent, bytes memory data) = players[i].call{value: val}("");
                require(sent, "Failed to send Ether");
            }
        }
    }
 
    function getAllPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBetOfPlayer(address player) public view returns (Bet memory) {
        return _bet[player];
    }

    /*function getDrawTime() public view returns (Bet memory) {
        return _bet[player];
    }*/

    function getBalance() public view returns (uint256 ) {
        return address(this).balance;
    }
}
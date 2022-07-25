// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./contracts/utils/Context.sol";
import "hardhat/console.sol";

contract QAReward is Context{

    string private _name;
    string private _symbol;
    address payable public owner;

    uint[3] awardRatio = [7,2,1];   // (/10)

    struct QuestionData{
        address provider;
        uint256 award;
        string questionId;
        uint rewardDate;
        //mapping( => string) _answers;     //answerId => answerer
    }

    struct AnswerData{    
        address payable answerer;
        string answerId;
        //mapping( => string) _answers;     //answerId => answerer
    }
    mapping(string => mapping(uint=>AnswerData))  answerData;     //questionId => ()

    mapping(string => QuestionData)   questionData;    //question => awardData

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        owner = payable(msg.sender);
    }


    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    //called when a new question is added
    function proposeAward(string memory question, uint timeoutDate) public payable{
        console.log("new question:" , question);
        console.log("   sender:" , msg.sender);
        console.log("   award:" , msg.value);
        questionData[question] = QuestionData({
            provider : msg.sender, 
            award : msg.value,
            questionId:question, 
            rewardDate: timeoutDate});

        QuestionData memory _question = questionData[question];
        console.log("get questionId:" , _question.questionId);
    }

    function getProposeAward(string memory question) public view returns(uint256){
        QuestionData memory _question = questionData[question];

        return _question.award;
    }

    //pdate top 3 answer
    function updateAnswerRanking(string memory question, uint index, address payable answerer, string memory answerId) public {
        console.log("updateAnswerRanking, question:" , question);
        
        QuestionData memory _question = questionData[question];
        console.log("updateAnswerRanking, questionId:" , _question.questionId);
        mapping(uint=>AnswerData) storage answers = answerData[_question.questionId];
        console.log("updateAnswerRanking, answerId:" , answerId);
        answers[index].answerId = answerId;
        answers[index].answerer = answerer;
    }


    function getAnswerRanking(string memory question, uint index) view public returns (string memory) {
        QuestionData memory _question = questionData[question];
        mapping(uint=>AnswerData) storage answers = answerData[_question.questionId];

        return answers[index].answerId;
    }

    //transfer award to top 3 answerer based on rewardRatio
    function award(string memory question)public payable{
        QuestionData memory _question = questionData[question];
        mapping(uint=>AnswerData) storage answers = answerData[_question.questionId];
        uint256 awardValue = _question.award;   //wei


        uint i;
        for(i=0; i<3; i++){
            AnswerData memory answer = answers[i];
            address payable answerer = answer.answerer;
            uint256 ratio = awardRatio[i];
            uint256 _award = awardValue / 10 * ratio;
            answerer.transfer(_award);
        }
    }
}
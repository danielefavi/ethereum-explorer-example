// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MessageCenter {

    string public message;
    string public specialMessage;

    event UpdatedSpecialMessages(string oldMessage, string newMessage);

    function getMessage() public view returns (string memory) {
        return message;
    }

    function updateSpecialMessage(
        string memory newMessage
    ) public payable {
        require(msg.value == 100);

        string memory oldMessage = message;
        specialMessage = newMessage;

        emit UpdatedSpecialMessages(oldMessage, newMessage);
    }

    function updateMessage(
        string memory newMessage
    ) public {
        message = newMessage;
    }

}

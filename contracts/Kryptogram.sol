// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Kryptogram{
    struct Post{
        uint id;
        string imgHash;
        string description;
        uint createdTime;
        uint tipAmount;
        address author;
    }
    
    string public name = "Kryptogram";
    uint public postsCount = 0;

    mapping(uint => Post) public posts;

    event PostCreated(
        uint id,
        string imgHash,
        string description,
        uint createdTime,
        uint tipAmount,
        address indexed author 
    );

    event PostTipped(
        uint id,
        string imgHash,
        uint tippedTime,
        uint amountTipped,
        address indexed donor,
        address author
    );

    constructor(){}

    // to create a new post
    function createPost(string memory _imgHash,string memory _description) public {

        //image hash should exist
        require(bytes(_imgHash).length > 0,"Image should be uploaded");

        //description should exist
        require(bytes(_description).length > 0,"Description should not be empty");

        postsCount++;

        // create new post
        posts[postsCount] = Post(
            {
                id: postsCount,
                imgHash: _imgHash,
                description: _description,
                createdTime: block.timestamp,
                tipAmount: 0,
                author: msg.sender
            }
        );

        // emit event 
        emit PostCreated(postsCount,_imgHash,_description,block.timestamp,0,msg.sender);
    }

    //to tip author
    function tipPostAuthor(uint _id) public payable {
        //making sure post id is valid
        require(_id > 0 && _id <= postsCount);

        //fetch the post
        Post storage _post = posts[_id];
        
        //fetch the author
        address payable author = payable(_post.author);
        
        //transfer ether to author
        author.transfer(msg.value);
        
        //increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;

        //emit event
        emit PostTipped(_id,_post.imgHash,block.timestamp,msg.value,msg.sender,_post.author);
    }

}
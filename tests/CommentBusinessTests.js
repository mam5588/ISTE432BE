const assert = require("assert");
const commentBusiness = require('../business/commentBusiness.js');

function testGetCommentNotFound(){
  let commentID = 3421534215421;
  commentBusiness.getComment(commentID)
  .then(function(result){
    if(result[0] == 404 && result[1] == `no comment with commentID ${commentID} exists`){
      console.log("testGetCommentNotFound Passed");
    }
    else{
      console.log("testGetCommentNotFound Failed")
    }
  });
}

function testInsertCommentNull(){
  commentBusiness.addComment("person1ID", "adminPlaylist1ID", null)
  .then(function(result){
    if(result[0] == 400 && result[1] == "Comments cannot be null."){
      console.log("testInsertCommentNull Passed");
    }
    else{
      console.log("testInsertCommentNull Failed")
    }
  });
}

function testInsertCommentTooShort(){
  commentBusiness.addComment("person1ID", "adminPlaylist1ID", "")
  .then(function(result){
    if(result[0] == 400 && result[1] == "Comments be between 0 and 140 characters."){
      console.log("testInsertCommentTooShort Passed");
    }
    else{
      console.log("testInsertCommentTooShort Failed")
    }
  });
}

function testInsertCommentTooLong(){
  commentBusiness.addComment("person1ID", "adminPlaylist1ID", "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll")
  .then(function(result){
    if(result[0] == 400 && result[1] == "Comments be between 0 and 140 characters."){
      console.log("testInsertCommentTooLong Passed");
    }
    else{
      console.log("testInsertCommentTooLong Failed")
    }
  });
}

testGetCommentNotFound();
testInsertCommentNull();
testInsertCommentTooShort();
testInsertCommentTooLong();
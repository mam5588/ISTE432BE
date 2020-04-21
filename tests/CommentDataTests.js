
const commentData = require('../data/commentData.js');

function testGetAllCommentsByPlaylist(){
  var playlistID = "adminPlaylist1ID";
  var result = commentData.getPlaylistComments(playlistID);
  var expResult = [
    {
        "commentID": 1,
        "comment": "Wow great song!",
        "personID": "reviewer1ID",
        "playlistID": "adminPlaylist1ID",
        "createdDate": "2020-04-03T18:46:16.000Z",
        "lastUpdatedDate": "2020-04-03T18:46:16.000Z"
    },
    {
        "commentID": 2,
        "comment": "This song is awful!!!",
        "personID": "reviewer2ID",
        "playlistID": "adminPlaylist1ID",
        "createdDate": "2020-04-03T18:46:16.000Z",
        "lastUpdatedDate": "2020-04-03T18:46:16.000Z"
    }
  ]
  if(result = expResult){
    console.log("testGetAllCommentsByPlaylist Passed");
  }
  else{
    console.log("testGetAllCommentsByPlaylist Failed");
  }
}

function testGetPlaylistCommentsByUser(){
  var personID = "reviewer2ID";
  var playlistID = "adminPlaylist1ID";
  var result = commentData.getUserComments(personID, playlistID);
  var expResult = [
    {
        "commentID": 2,
        "comment": "This song is awful!!!",
        "personID": "reviewer2ID",
        "playlistID": "adminPlaylist1ID",
        "createdDate": "2020-04-03T18:46:16.000Z",
        "lastUpdatedDate": "2020-04-03T18:46:16.000Z"
    }
  ]
  if(result = expResult){
    console.log("testGetPlaylistCommentsByUser Passed");
  }
  else{
    console.log("testGetPlaylistCommentsByUser Failed");
  }
}

function testGetComment(){
  var commentID = 2;
  var result = commentData.getComment(commentID);
  var expResult = {
    "commentID": 2,
    "comment": "This song is awful!!!",
    "personID": "reviewer2ID",
    "playlistID": "adminPlaylist1ID",
    "createdDate": "2020-04-03T18:46:16.000Z",
    "lastUpdatedDate": "2020-04-03T18:46:16.000Z"
  }
  if(result = expResult){
    console.log("testGetComment Passed");
  }
  else{
    console.log("testGetComment Failed");
  }
}

function testInsertComment(){
  var today = new Date();
  commentData.addComment("reviewer1ID", "adminPlaylist1ID", "This song is awful!!!", today, today)
  .then(function(result){
    if(result == 1){
      console.log("testInsertComment Passed");
    }
    else{
      console.log("testInsertComment Failed");
    }
  });
}

testGetAllCommentsByPlaylist();
testGetPlaylistCommentsByUser();
testGetComment();
testInsertComment();
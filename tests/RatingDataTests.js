
const ratingData = require('../data/ratingData.js');



function testGetAverageRating(){
  var playlistID = "adminPlaylist1ID";
  var result = ratingData.getAverageRating(playlistID);

  if(result != null){
    console.log("testGetAverageRating passed");
  }
  else{
    console.log("testGetAverageRating failed");
  }
}

function testGetAllRatings(){
 var playlistID = "adminPlaylist1ID";
 var result = ratingData.getAllRatings(playlistID);
 
   if(result != null){
     console.log("testGetAllRatings passed");
   }
   else{
     console.log("testGetAllRatings failed");
   }
}

function testGetRating(){
  var personID ="reviewer1ID";
  var playlistID = "adminPlaylist1ID";
  var result = ratingData.getRating(personID, playlistID);
  var expResult = {
    "rating": 5,
    "personID": "reviewer1ID",
    "playlistID": "adminPlaylist1ID",
    "createdDate": "2020-04-20T19:22:26.000Z",
    "lastUpdatedDate": "2020-04-20T19:22:26.000Z"
    }
  if(result = expResult){
    console.log("testGetRating passed");
  }
  else{
    console.log("testGetRating failed");
  }
}

function insertRating(){
  var personID = "reviewer3ID";
  var playlistID = "adminPlaylist1ID";
  var rating = 3;
  var createdDate = "2020-04-20 02:03:45";
  var lastUpdatedDate = "2020-04-20 02:03:45";

  var result = ratingData.addRating(personID, playlistID, rating, createdDate, lastUpdatedDate);
  var expResult = {"success": `Successfully inserted 1 ratings`}";

  if(result = expResult){
    console.log("insertRating passed");
  }
  else{
    console.log("insertRating failed");
  }
}

function deleteRating(){
  var personID = "reviewer3ID";
  var result = ratingData.deleteRating(personID);
  var expResult = {"success": `Successfully deleted 1 rating`};
  if(result = expResult){
    console.log("deleteRating passed");
  }
  else{
    console.log("deleteRating failed");
  }
}

testGetAverageRating();
testGetAllRatings();
testGetRating();
insertRating();
deleteRating();
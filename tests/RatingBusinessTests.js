const ratingBusiness = require('../business/ratingBusiness.js');


function testGetAverageRatingNotFound(){
  ratingBusiness.getAverageRating("fdas")
  .then(function(result){
    if(result[0] == 404){
      console.log("testGetAverageRatingNotFound Passed");
    }
    else{
      console.log("testGetAverageRatingNotFound Failed")
    }
  });
}


function testGetAverageRatingFound(){
  ratingBusiness.getAverageRating("adminPlaylist1ID")
  .then(function(result){
    if(result[0] == 200){
      console.log("testGetAverageRatingFound Passed");
    }
    else{
      console.log("testGetAverageRatingFound Failed")
    }
  });
}

function testGetRatingNotFound(){
  ratingBusiness.getRating("fdsa","fdas")
  .then(function(result){
    if(result[0] == 404){
      console.log("testGetRatingNotFound Passed");
    }
    else{
      console.log("testGetRatingNotFound Failed")
    }
  });
}

function testGetRatingFound(){
  ratingBusiness.getRating("reviewer1ID","adminPlaylist1ID")
  .then(function(result){
    if(result[0] == 200){
      console.log("testGetRatingFound Passed");
    }
    else{
      console.log("testGetRatingFound Failed")
    }
  });
}

function testInsertRatingNull(){
  ratingBusiness.addRating("person10ID", "adminPlaylist1ID", null)
  .then(function(result){
    if(result[0] == 400){
      console.log("testInsertRatingNull Passed");
    }
    else{
      console.log("testInsertRatingNull Failed")
    }
  });
}

function testInsertRatingNotANumber(){
  ratingBusiness.addRating("person10ID", "adminPlaylist1ID", "fdsa")
  .then(function(result){
    if(result[0] == 400){
      console.log("testInsertRatingNotANumber Passed");
    }
    else{
      console.log("testInsertRatingNotANumber Failed")
    }
  });
}

function testInsertRatingTooLow(){
  ratingBusiness.addRating("person10ID", "adminPlaylist1ID", 0)
  .then(function(result){
    if(result[0] == 400){
      console.log("testInsertRatingTooLow Passed");
    }
    else{
      console.log("testInsertRatingTooLow Failed")
    }
  });
}

function testInsertRatingTooHigh(){
  ratingBusiness.addRating("person10ID", "adminPlaylist1ID", 6)
  .then(function(result){
    if(result[0] == 400){
      console.log("testInsertRatingTooHigh Passed");
    }
    else{
      console.log("testInsertRatingTooHigh Failed")
    }
  });
}

testGetAverageRatingNotFound();
testGetAverageRatingFound();
testGetRatingNotFound();
testGetRatingFound();
testInsertRatingNotANumber();
testInsertRatingNull();
testInsertRatingTooLow();
testInsertRatingTooHigh();
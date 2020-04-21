const ratingBusiness = require('../business/ratingBusiness.js');

function testGetRatingNotFound(){
  ratingBusiness.getRating("fdsa","fdas")
  .then(function(result){
    if(result[0] == 404 && result[1] == "This person does not have a rating for this playlist."){
      console.log("testGetRatingNotFound Passed");
    }
    else{
      console.log("testGetRatingNotFound Failed")
    }
  });
}

testGetRatingNotFound();
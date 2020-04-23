const personData = require('../data/PersonData.js');
const fetch = require("node-fetch");

const ErrorMessage = [500,{"error":"Sorry, could not process your request right now."}];

/**
 * Get all people in the system
*/
let getAllPeople = function(){
    return new Promise(function(resolve, reject){
        try{
            personData.getAllPeople()
            .then(function(people){
                resolve([200, people]);
            })
        }
        catch(err){
            resolve(ErrorMessage);
        }
  });
}

/**
 * Get a person by personID
 * @param {String} personID ID of person to retrieve
*/
let getPersonByID = function(personID){
    return new Promise(function(resolve, reject){
        if(personID == null || personID === ""){
            resolve([400, {"error": "PersonID must be a non-empty string."}]);
        }

        try{
            personData.getPersonByID(personID)
            .then(function(person){
                if(person == null){
                    resolve([404, {"error": "No person with that personID is registered in our system."}]);
                }
                resolve([200, person]);
            })
        }
        catch(err){
            resolve(ErrorMessage);
        }
  });
}

/**
 * Get a person by personID
 * @param {String} personID ID of person to retrieve
*/
let getPersonByName = function(personName){
    return new Promise(function(resolve, reject){
        if(personName == null || personName === ""){
            resolve([400, {"error": "Person Name must be a non-empty string."}]);
        }

        try{
            personData.getPersonByName(personName)
            .then(function(person){
                if(person == null){
                    resolve([404, {"error": "No person with that name is registered in our system."}]);
                }
                resolve([200, person]);
            })
        }
        catch(err){
            resolve(ErrorMessage);
        }
  });
}

/**
 * Insert a new person via the Spotify API
 * @param {String} accessToken Spotify API access token for new user
 */
let registerPerson = function(accessToken){
    return new Promise(function(resolve, reject){
        try{
            //Call to Spotify API to retrieve user information
           fetch("https://api.spotify.com/v1/me", {headers:{'Authorization': `Bearer ${accessToken}`}})
            .then(response => response.json())
            .then(function(responseJson){
                let personID = responseJson.id;

                //Check that user is not already registered
                getPersonByID(personID)
                .then(function(result){
                    if(result[0] == 200){
                        resolve([result[0], result[1]]);
                    }
                    
                    //Add person to database
                    personData.addPerson(personID, personName, today, today)
                    .then(function(affectedRows){
                        resolve([200, {"success": `successfully added ${affectedRows} users`}]);
                    })
                })
            });
        }
        catch(err){
            resolve(ErrorMessage);
        }
  });
}

/**
 * Delete an existing person by person ID
 * @param {int} personID ID of person to delete
 */
let deletePerson = function(personID){
  return new Promise(function(resolve, reject){
    //Ensure that person exists in our system
    getPersonByID(personID)
    .then(function(result){

      //If issue with person retrieval, rethrow issue to service layer
      if(result[0] != 200){
        resolve([result[0], result[1]]);
        return;
      }
    
      //Delete person from the database
      personData.deletePerson(personID)
      .then(function(affectedRows){

        //If no rows are affected something went wrong
        if(affectedRows == 0){
            resolve(ErrorMessage);
          return;
        }
        resolve([200, {"success": `deleted ${affectedRows} user`}]);
      })
      .catch(function(err){
        resolve(ErrorMessage);
      });
    });
  });
}

module.exports = {
    getAllPeople,
    getPersonByID,
    getPersonByName,
    registerPerson,
    deletePerson
};

const personData = require('../data/PersonData.js');
const spotify = require('./SpotifyProxy.js');

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
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
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
            return;
        }

        try{
            personData.getPersonByID(personID)
            .then(function(person){
                if(person == null){
                    resolve([404, {"error": "No person with that personID is registered in our system."}]);
                    return;
                }
                resolve([200, person]);
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
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
            return;
        }

        try{
            personData.getPersonByName(personName)
            .then(function(person){
                if(person == null){
                    resolve([404, {"error": "No person with that name is registered in our system."}]);
                    return;
                }
                resolve([200, person]);
                return;
            })
        }
        catch(err){
            resolve(ErrorMessage);
            return;
        }
  });
}

/**
 * Insert a new person via the Spotify API
 * @param {String} accessToken Spotify API access token for new user
 */
let login = function(accessToken){
    return new Promise(function(resolve, reject){
        try{
            //Call to Spotify API to retrieve user information
            spotify.get("https://api.spotify.com/v1/me", accessToken)
            .then(function(responseJson){
                let personID = responseJson.id;

                //Check that user is not already registered
                getPersonByID(personID)
                .then(function(result){
                    if(result[0] == 200){
                        resolve([result[0], result[1]]);
                        return;
                    }

                    let personName = responseJson.display_name;
                    
                    //Add person to database
                    personData.addPerson(personID, personName, new Date())
                    .then(function(affectedRows){

                        //Return 200 with logged in user information
                        getPersonByID(personID)
                        .then(function(result){
                            if(result[0] == 200){
                                resolve([result[0], result[1]]);
                                return;
                            }
                        });
                    })
                })
            });
        }
        catch(err){
            resolve(ErrorMessage);
            return;
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
        return;
      });
    });
  });
}

module.exports = {
    getAllPeople,
    getPersonByID,
    getPersonByName,
    login,
    deletePerson
};

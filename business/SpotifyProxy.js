const fetch = require("node-fetch");

/**
 * Make a call to the spotify proxy and return json from response
 * @param {String} url url of spotify endpoint
 * @param {String} accessToken access token for authentication with spotify
 */
let get = function(url, accessToken){
    return new Promise(function(resolve, reject){
        try{
            //Call to Spotify API to retrieve user information
            fetch(url, {headers:{'Authorization': `Bearer ${accessToken}`}})
            .then(response => response.json())
            .then(function(responseJson){
                resolve(responseJson);
                return;
            })
            .catch(function(err){
                reject(err);
                return
            });
        }
        catch(err){
            reject("Error getting data.");
            return;
        }
  });
}

module.exports = {
    get
};

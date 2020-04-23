const DBConn = require('./DBConn.js');
const Person = require('../util/Person.js');

module.exports = {

    /**
     * Get all people in the system
     */
    getAllPeople(){
        return new Promise(function(resolve, reject){

            let personList = [];
            let query = "SELECT * FROM person;";
            DBConn.query(query)
            .then(function(result){
                result.forEach(function(row){
                    personList.push(new Person(row.personID, row.personName, row.createdDate, row.lastUpdatedDate));
                });
                resolve(personList);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a person by personID
     * Null if no result
     * @param {String} personID ID of person to search for
     */
    getPersonByID(personID){
        return new Promise(function(resolve, reject){

            let person = null;
            let query = "SELECT * FROM person WHERE personID = ?;";
            DBConn.query(query, [personID])
            .then(function(result){
                if(result.length != 0){
                    row = result[0];
                    person = new Person(row.personID, row.personName, row.createdDate, row.lastUpdatedDate);
                }
                resolve(person);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Get a person by name
     * Null if no result
     * @param {String} personName Name of person to search for
     */
    getPersonByName(personName){
        return new Promise(function(resolve, reject){

            let person = null;
            let query = "SELECT * FROM person WHERE personName = ?;";
            DBConn.query(query, [personName])
            .then(function(result){
                if(result.length != 0){
                    row = result[0];
                    person = new Person(row.personID, row.personName, row.createdDate, row.lastUpdatedDate);
                }
                resolve(person);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Insert a new person
     * @param {String} personID ID of person
     * @param {String} personName name of person
     * @param {String} createdDate the date on which the person was created
     * @param {String} lastUpdatedDate the date on which the person was last updated
     */
    addPerson(personID, personName, createdDate, lastUpdatedDate){
        return new Promise(function(resolve, reject){
            let query = "INSERT INTO person (personID, personName, createdDate, lastUpdatedDate) VALUES (?, ?, ?, ?);";

            DBConn.query(query, [personID, personName, createdDate, lastUpdatedDate])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    },

    /**
     * Delete a person by person ID
     * @param {String} personID ID of person to delete
     */
    deletePerson(personID){
        return new Promise(function(resolve, reject){
            let query = "DELETE FROM person WHERE personID = ?;";

            DBConn.query(query, [personID])
            .then(function(result){
                resolve(result.affectedRows);
            })
            .catch(function(err){
                reject(err);
            });
        });
    }
}

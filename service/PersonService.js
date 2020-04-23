const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const personBusiness = require('../business/PersonBusiness.js');

/**
 * Get a person's information by personID
 */
router.get('/people', (req, res) => {
    personBusiness.getAllPeople()
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a person's information by personID
 */
router.get('/person/id', (req, res) => {
    personBusiness.getPersonByID(req.query.personID)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a person's information by personID
 */
router.get('/person/name', (req, res) => {
    personBusiness.getPersonByName(req.query.personID)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Register a new user to the system
 */
router.post('/login', (req, res) => {
    personBusiness.registerPerson(req.body.accessToken)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Register a new user to the system
 */
router.delete('/person', (req, res) => {
    personBusiness.deletePerson(req.body.personID)
    .then(function(responseInfo){
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

module.exports = router;
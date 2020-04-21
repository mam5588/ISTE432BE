const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const ratingBusiness = require('../business/RatingBusiness.js');

/**
 * Get the average rating of a playlist
 */
router.get('/ratings', (req, res) => {
    ratingBusiness.getAllRatings(req.query.playlistID)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get the average rating of a playlist
 */
router.get('/rating/average', (req, res) => {
    ratingBusiness.getAverageRating(req.query.playlistID)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a specific person's rating of a playlist
 */
router.get('/rating', (req, res) => {
    ratingBusiness.getRating(
            req.query.personID,
            req.query.playlistID
    )
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Add a rating for a playlist
 */
router.post('/rating', (req, res) => {
    ratingBusiness.addRating(
        req.body.personID,
        req.body.playlistID,
        req.body.rating
    )
    .then(function(responseInfo){
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Add a rating for a playlist
 */
router.delete('/rating', (req, res) => {
    ratingBusiness.deleteRating(
        req.body.personID,
        req.body.playlistID
    )
    .then(function(responseInfo){
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

module.exports = router;
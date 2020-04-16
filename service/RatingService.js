const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const ratingBusiness = require('../business/RatingBusiness.js');

/**
 * Get the average rating of a playlist
 */
router.get('/rating/average', (req, res) => {
    let responseInfo = ratingBusiness.getAverageRating(
        req.query.playlistID
    );

    res.statusCode = responseInfo[0];
    res.json(responseInfo[1]);
});

/**
 * Get a specific person's rating of a playlist
 */
router.get('/rating', (req, res) => {
    let responseInfo = ratingBusiness.getRating(
        req.query.personID,
        req.query.playlistID
    );

    res.statusCode = responseInfo[0];
    res.json(responseInfo[1]);
});

/**
 * Add a rating for a playlist
 */
router.post('/rating', (req, res) => {
    let responseInfo = ratingBusiness.addRating(
        req.body.personID,
        req.body.playlistID,
        req.body.rating
      );

      res.statusCode = responseInfo[0];
      res.json(responseInfo[1]);
});

/**
 * Add a rating for a playlist
 */
router.delete('/rating', (req, res) => {
    let responseInfo = ratingBusiness.deleteRating(
        req.body.ratingID
      );

      res.statusCode = responseInfo[0];
      res.json(responseInfo[1]);
});

module.exports = router;
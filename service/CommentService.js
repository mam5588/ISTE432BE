const express = require('express');
const router = express.Router();    

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const commentBusiness = require('../business/CommentBusiness.js');

/**
 * Get all comments for a playlist
 */
router.get('/comments', (req, res) => {
    let responseInfo = commentBusiness.getAllComments(
        req.query.playlistID
      );

      res.statusCode = responseInfo[0];
      res.json(responseInfo[1]);
});

/**
 * Get a specific comment for a person ID on a playlist ID
 */
router.get('/comment', (req, res) => {
    let responseInfo = commentBusiness.getComment(
        req.query.personID,
        req.query.playlistID
      );

      res.statusCode = responseInfo[0];
      res.json(responseInfo[1]);
});

/**
 * Add a comment for a playlist
 */
router.post('/comment', (req, res) => {
    let responseInfo = commentBusiness.addComment(
        req.body.personID,
        req.body.playlistID,
        req.body.comment
    );

    res.statusCode = responseInfo[0];
    res.json(responseInfo[1]);
});

/**
 * Delete a comment
 */
router.delete('/comment', (req, res) => {
    let responseInfo = commentBusiness.deleteComment(
        req.query.commentID
    );

    res.statusCode = responseInfo[0];
    res.json(responseInfo[1]);
});

module.exports = router;
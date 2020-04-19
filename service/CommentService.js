const express = require('express');
const router = express.Router();    

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const commentBusiness = require('../business/CommentBusiness.js');

/**
 * Get the average comment of a playlist
 */
router.get('/comments/playlist', (req, res) => {
    commentBusiness.getPlaylistComments(req.query.playlistID)
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a specific person's comments for a playlist
 */
router.get('/comments/user', (req, res) => {
    commentBusiness.getUserComments(
            req.query.personID,
            req.query.playlistID,
    )
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a specific comment by commentID
 */
router.get('/comment', (req, res) => {
    commentBusiness.getComment(
            req.query.commentID,
    )
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Add a comment for a playlist
 */
router.post('/comment', (req, res) => {
    commentBusiness.addComment(
        req.body.personID,
        req.body.playlistID,
        req.body.comment
    )
    .then(function(responseInfo){
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Add a comment for a playlist
 */
router.delete('/comment', (req, res) => {
    commentBusiness.deleteComment(
        req.body.commentID,
    )
    .then(function(responseInfo){
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

module.exports = router;
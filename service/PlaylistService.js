const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const playlistBusiness = require('../business/PlaylistBusiness.js');

/**
 * Get a person's information by personID
 */
router.get('/playlists', (req, res) => {
    playlistBusiness.getAllPlaylists(req.query.search, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a person's information by personID
 */
router.get('/playlists/me', (req, res) => {
    playlistBusiness.getMyPlaylists(req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a person's information by personID
 */
router.get('/playlist', (req, res) => {
    playlistBusiness.getPlaylist(req.query.playlistID, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

module.exports = router;
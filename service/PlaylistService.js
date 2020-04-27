const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:false}));

const playlistBusiness = require('../business/PlaylistBusiness.js');

/**
 * Get all playlists from our system
 * Provides an optional search parameter
 */
router.get('/playlists', (req, res) => {
    playlistBusiness.getAllPlaylists(req.query.search, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get all playlists a person owns on spotify
 */
router.get('/playlists/me', (req, res) => {
    playlistBusiness.getMyPlaylists(req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Get a playlist's information by playlistID
 * Only retrieves playlists that exist in our system
 */
router.get('/playlist', (req, res) => {
    playlistBusiness.getPlaylist(req.query.playlistID, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Add a playlist for sharing on our system
 */
router.post('/playlist', (req, res) => {
    playlistBusiness.addPlaylist(req.body.playlistID, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

/**
 * Remove a playlist from sharing on our system
 */
router.delete('/playlist', (req, res) => {
    playlistBusiness.deletePlaylist(req.body.playlistID, req.header("authorization"))
    .then(function(responseInfo){    
        res.statusCode = responseInfo[0];
        res.json(responseInfo[1]);
    });
});

module.exports = router;
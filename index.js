const express = require('express');
const router = express();

//Set up router
router.use(express.json());
router.use(express.urlencoded({extended:false}));

//Set up constants
const port = 8080;
//TODO: change this to whatever we want to name our project
const hostname = '/audiocracy';


//Import and set routes for subsystems
const personRoutes = require('./service/PersonService.js');
const playlistRoutes = require('./service/PlaylistService.js');
const commentRoutes = require('./service/CommentService.js');
const ratingRoutes = require('./service/RatingService.js');

router.use(hostname, personRoutes);
router.use(hostname, playlistRoutes);
router.use(hostname, commentRoutes);
router.use(hostname, ratingRoutes);

//Open port and log that app is active
router.listen(port, console.log(`Router listening for input on port: ${port}`));

module.exports = router;
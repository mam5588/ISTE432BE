class Track {
    constructor(trackID, name, album, artist, spotifyURL, imageURL) {
        this.trackID = trackID;
        this.name = name;
        this.album = album;
        this.artist = artist;
        this.spotifyURL = spotifyURL;
        this.imageURL = imageURL;
    }
}

module.exports = Track;
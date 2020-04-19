class Playlist {
    constructor(playlistID, personID, createdDate, lastUpdatedDate) {
        this.playlistID = playlistID;
        this.personID = personID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
}

module.exports = Playlist;
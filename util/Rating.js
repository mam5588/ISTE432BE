class Rating {
    constructor(rating, personID, playlistID, createdDate, lastUpdatedDate) {
        this.rating = rating;
        this.personID = personID;
        this.playlistID = playlistID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
}

module.exports = Rating;
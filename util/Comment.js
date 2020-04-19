class Comment {
    constructor(commentID, comment, personID, playlistID, createdDate, lastUpdatedDate) {
        this.commentID = commentID;
        this.comment = comment;
        this.personID = personID;
        this.playlistID = playlistID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
}

module.exports = Comment;
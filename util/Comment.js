class Comment {
    constructor(commentID, comment, personID, playlistID, createdDate, lastUpdatedDate) {
        this.commentID = commentID;
        this.comment = comment;
        this.personID = personID;
        this.playlistID = playlistID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
  
    get commentID(){
        return this._commentID;
    }
  
    get comment(){
        return this._comment;
    }
  
    get personID(){
        return this._personID;
    }
  
    get playlistID(){
        return this._playlistID;
    }
  
    get createdDate(){
        return this._createdDate;
    }
  
    get lastUpdatedDate(){
        return this._lastUpdatedDate;
    }
  
    set commentID(value){
        return this._commentID = value;
    }
  
    set comment(value){
        return this._comment = value;
    }
  
    set personID(value){
        return this._personID = value;
    }
  
    set playlistID(value){
        return this._playlistID = value;
    }

    set createdDate(value){
        return this._createdDate = value;
    }

    set lastUpdatedDate(value){
        return this._lastUpdatedDate = value;
    }
}

module.exports = Comment;
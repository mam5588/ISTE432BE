class Rating {
    constructor(rating, personID, playlistID, createdDate, lastUpdatedDate) {
        this.rating = rating;
        this.personID = personID;
        this.playlistID = playlistID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
  
    get rating(){
        return this._rating;
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
  
    set rating(value){
        return this._rating = value;
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

module.exports = Rating;
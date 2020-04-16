class Playlist {
    constructor(playlistID, personID, createdDate, lastUpdatedDate) {
        this.playlistID = playlistID;
        this.personID = personID;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }
  
    get playlistID(){
        return this._playlistID;
    }
  
    get personID(){
        return this._personID;
    }
  
    get createdDate(){
        return this._createdDate;
    }
  
    get lastUpdatedDate(){
        return this._lastUpdatedDate;
    }
  
    set playlistID(value){
        this._playlistID = value;
    }
  
    set personID(value){
        this._personID = value;
    }

    set createdDate(value){
        this._createdDate = value;
    }

    set lastUpdatedDate(value){
        this._lastUpdatedDate = value;
    }
}

module.exports = Playlist;
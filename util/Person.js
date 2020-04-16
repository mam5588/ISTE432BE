class Person {
    constructor(personID, personName, createdDate, lastUpdatedDate) {
        this.personID = personID;
        this.personName = personName;
        this.createdDate = createdDate;
        this.lastUpdatedDate = lastUpdatedDate;
    }

    get personID(){
        return this._personID;
    }

    get personName(){
        return this._personName;
    }

    get createdDate(){
        return this._createdDate;
    }

    get lastUpdatedDate(){
        return this._lastUpdatedDate;
    }

    set personID(personID){
        this._personID = personID;
    }

    set personName(personName){
        this._personName = personName;
    }

    set createdDate(createdDate){
        this._createdDate = createdDate;
    }

    set lastUpdatedDate(lastUpdatedDate){
        this._lastUpdatedDate = lastUpdatedDate;
    }
}

module.exports = Person;
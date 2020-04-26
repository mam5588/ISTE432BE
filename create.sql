DROP DATABASE IF EXISTS audiocracy;
CREATE DATABASE audiocracy;
USE audiocracy;

DROP TABLE IF EXISTS person;
CREATE TABLE person(
    personID VARCHAR(240) NOT NULL,
    personName VARCHAR(240) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT person_pk PRIMARY KEY (personID)
);

DROP TABLE IF EXISTS playlist;
CREATE TABLE playlist(
    personID VARCHAR(240) NOT NULL,
    playlistID VARCHAR(240) NOT NULL,
    playlistName VARCHAR(240) NOT NULL,
    CONSTRAINT playlist_pk PRIMARY KEY (playlistID)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    commentID INTEGER NOT NULL AUTO_INCREMENT,
    comment VARCHAR(240) NOT NULL,
    personID VARCHAR(240) NOT NULL,
    playlistID VARCHAR(240) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comment_pk PRIMARY KEY (commentID)
);

DROP TABLE IF EXISTS rating;
CREATE TABLE rating (
    rating INTEGER NOT NULL,
    personID VARCHAR(240) NOT NULL,
    playlistID VARCHAR(240) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (rating>=1 AND rating<=5),
    CONSTRAINT rating_pk PRIMARY KEY (personID, playlistID)
);

INSERT INTO PERSON (personID, personName) VALUES ("22alke7dt3fxpeo6d5s7bmcxq", "Matt Marchinetti");

INSERT INTO PLAYLIST (playlistID, personID, playlistName) VALUES ("1uxepaMSIq93jcUNLjrB4W", "22alke7dt3fxpeo6d5s7bmcxq", "Test");
INSERT INTO PLAYLIST (playlistID, personID, playlistName) VALUES ("7e8ya7TWqCuG2hAZ6E6swa", "22alke7dt3fxpeo6d5s7bmcxq", "Classic Rock");
INSERT INTO PLAYLIST (playlistID, personID, playlistName) VALUES ("7Hy5SpIzMFHbe6OFjTsq2i", "22alke7dt3fxpeo6d5s7bmcxq", "Stuff");

INSERT INTO RATING (personID, playlistID, rating) VALUES ("22alke7dt3fxpeo6d5s7bmcxq", "7e8ya7TWqCuG2hAZ6E6swa", 5);

INSERT INTO Comment (personID, playlistID, rating) VALUES ("22alke7dt3fxpeo6d5s7bmcxq", "7e8ya7TWqCuG2hAZ6E6swa", "Rocky movies are the best");
INSERT INTO Comment (personID, playlistID, rating) VALUES ("22alke7dt3fxpeo6d5s7bmcxq", "7e8ya7TWqCuG2hAZ6E6swa", "Summer of 69 is the GOAT.");

ALTER TABLE playlist
    ADD FOREIGN KEY (personID) REFERENCES person(personID)
    ON DELETE CASCADE;

ALTER TABLE comment
    ADD FOREIGN KEY (personID) REFERENCES person(personID)
    ON DELETE CASCADE;
ALTER TABLE comment
    ADD FOREIGN KEY (playlistID) REFERENCES playlist(playlistID)
    ON DELETE CASCADE;

ALTER TABLE rating
    ADD FOREIGN KEY (personID) REFERENCES person(personID)
    ON DELETE CASCADE;
ALTER TABLE rating
    ADD FOREIGN KEY (playlistID) REFERENCES playlist(playlistID)
    ON DELETE CASCADE;



INSERT INTO playlist()
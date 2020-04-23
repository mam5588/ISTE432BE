DROP DATABASE IF EXISTS audiocracy;
CREATE DATABASE audiocracy;
USE audiocracy;

DROP TABLE IF EXISTS person;
CREATE TABLE person(
    personID VARCHAR(30) NOT NULL,
    personName VARCHAR(50) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT person_pk PRIMARY KEY (personID)
);

DROP TABLE IF EXISTS playlist;
CREATE TABLE playlist(
    personID VARCHAR(30) NOT NULL,
    playlistID VARCHAR(20) NOT NULL,
    playlistName VARCHAR(40) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT playlist_pk PRIMARY KEY (playlistID)
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment (
    commentID INTEGER NOT NULL AUTO_INCREMENT,
    comment VARCHAR(140) NOT NULL,
    personID VARCHAR(30) NOT NULL,
    playlistID VARCHAR(20) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comment_pk PRIMARY KEY (commentID)
);

DROP TABLE IF EXISTS rating;
CREATE TABLE rating (
    rating INTEGER NOT NULL,
    personID VARCHAR(30) NOT NULL,
    playlistID VARCHAR(20) NOT NULL,
    createdDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    lastUpdatedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (rating>=1 AND rating<=5),
    CONSTRAINT rating_pk PRIMARY KEY (personID, playlistID)
);


INSERT INTO person (personID, personName) VALUES ("adminID", "admin");
INSERT INTO person (personID, personName) VALUES ("reviewer1ID", "reviewer1");
INSERT INTO person (personID, personName) VALUES ("reviewer2ID", "reviewer2");

INSERT INTO playlist (playlistID, playlistName, personID) VALUES ("adminPlaylist1ID", "adminPlaylist1", "adminID");
INSERT INTO playlist (playlistID, playlistName, personID) VALUES ("adminPlaylist2ID", "adminPlaylist2", "adminID");

INSERT INTO comment (personID, playlistID, comment) VALUES ("reviewer1ID", "adminPlaylist1ID", "Wow great song!");
INSERT INTO comment (personID, playlistID, comment) VALUES ("reviewer2ID", "adminPlaylist1ID", "This song is awful!!!");

INSERT INTO rating (personID, playlistID, rating) VALUES ("reviewer1ID", "adminPlaylist1ID", 5);
INSERT INTO rating (personID, playlistID, rating) VALUES ("reviewer2ID", "adminPlaylist1ID", 1);



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
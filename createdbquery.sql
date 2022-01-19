/*CREATE DATABASE DatesDatabase;*/

USE master

CREATE TABLE Ratings (
    ID int NOT NULL IDENTITY PRIMARY KEY,
    LastName varchar(20) NOT NULL,
    FirstName varchar(20) NOT NULL,
    City varchar(20) NOT NULL,
    State varchar(20) NOT NULL,
	Ethnicity varchar(20),
	Picture1 varbinary(max),
	Picture2 varbinary(max),
	Picture3 varbinary(max),
	OverallRating int NOT NULL,
	Personality int,
	Humor int,
	Kindness int,
	Social int,
	Listening int,
	Respect int,
	Comments varchar(500),
	);
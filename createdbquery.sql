/*CREATE DATABASE DatesDatabase;*/

USE master

CREATE TABLE Ratings (
    ID int NOT NULL IDENTITY PRIMARY KEY,
    LastName varchar(20) NOT NULL,
    FirstName varchar(20) NOT NULL,
    City varchar(20) NOT NULL,
    State varchar(20) NOT NULL,
	Ethnicity varchar(40) NOT NULL,
	Picture varchar(max),
	OverallRating int NOT NULL,
	Personality int NOT NULL,
	Humor int NOT NULL,
	Kindness int NOT NULL,
	Social int NOT NULL,
	Listening int NOT NULL,
	Respect int NOT NULL,
	Comments varchar(MAX) NOT NULL,
	DateSubmitted datetime NOT NULL,
	Gender varchar(20) NOT NULL,
	Age int NOT NULL
	);
/*CREATE DATABASE DatesDatabase;*/

USE master

CREATE TABLE Ratings (
    ID int NOT NULL IDENTITY PRIMARY KEY,
    LastName varchar(20) NOT NULL,
    FirstName varchar(20) NOT NULL,
    City varchar(20) NOT NULL,
    State varchar(20) NOT NULL,
	Ethnicity varchar(40),
	Picture varchar(max),
	OverallRating int NOT NULL,
	Personality int,
	Humor int,
	Kindness int,
	Social int,
	Listening int,
	Respect int,
	Comments varchar(MAX),
	DateSubmitted varchar(255),
	Gender varchar(20),
	Age int
	);
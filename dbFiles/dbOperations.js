const config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");

const getDateInfo = async (lastName, firstName, city, state) => {
  try {
    console.log("success");
    let pool = await sql.connect(config);
    let result = await pool.request().query(`
            SELECT ID, LastName, FirstName, City, State, Ethnicity, OverallRating, Gender
            FROM Ratings 
            WHERE 
            LastName LIKE '%${lastName}%' AND
            FirstName LIKE '%${firstName}%' AND
            City LIKE '%${city}%' AND
            State LIKE '%${state}%'
        `);

    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const addReview = async (
  lastName,
  firstName,
  city,
  state,
  gender,
  age,
  overallRating,
  ethnicity,
  personality,
  humor,
  kindness,
  social,
  listening,
  respect,
  comments
) => {
  try {
    let pool = await sql.connect(config);

    return await pool.request().query(`
                INSERT INTO Ratings (
                    LastName, 
                    FirstName,
                    City,
                    State,
                    Gender,
                    Age,
                    OverallRating,
                    Ethnicity,
                    Personality,
                    Humor,
                    Kindness,
                    Social,
                    Listening,
                    Respect,
                    Comments,
                    DateSubmitted
                    )
                VALUES (
                    '${lastName}',
                    '${firstName}',
                    '${city}',
                    '${state}',
                    '${gender}',
                    '${age}',
                    '${overallRating}',     
                    '${ethnicity}',
                    '${personality}',
                    '${humor}',
                    '${kindness}',
                    '${social}',
                    '${listening}',
                    '${respect}',
                    '${comments}',
                    (SELECT CURRENT_TIMESTAMP)
                )
            `);
  } catch (error) {
    console.log(error);
  }
};

const uploadPicture = async (picture) => {
  try {
    let pool = await sql.connect(config);
    await pool.request().query(`
          UPDATE Ratings 
          SET 
          Picture = '${picture}'
          WHERE ID = (SELECT MAX(Id) FROM Ratings)
      `);
    return await pool.request().query(`
      SELECT TOP 1 *
      FROM Ratings  
      ORDER BY ID DESC
      `);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDateInfo,
  addReview,
  uploadPicture,
};

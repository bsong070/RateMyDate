const config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");

const getDateInfo = async (lastName, firstName, city, state) => {
  try {
    let pool = await sql.connect(config);
    return await pool.request().query(`
            SELECT *
            FROM Ratings 
            WHERE 
            LastName LIKE '%${lastName}%' AND
            FirstName LIKE '%${firstName}%' AND
            City LIKE '%${city}%' AND
            State LIKE '%${state}%'
        `);
  } catch (error) {
    alert(error);
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
    alert(error);
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
    alert(error);
  }
};

module.exports = {
  getDateInfo,
  addReview,
  uploadPicture,
};

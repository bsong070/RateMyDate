const express = require("express");
const cors = require("cors");
const dbOperations = require("./dbFiles/dbOperations");
const fileUpload = require("express-fileupload");

const API_PORT = process.env.PORT || 5000; // add env file or autos to port 5000
const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.post("/api", async (req, res) => {
  const result = await dbOperations.getDateInfo(
    req.body.lastName,
    req.body.firstName,
    req.body.city,
    req.body.state
  );
  res.send(result.recordset);
});

app.post("/uploadpicture", async (req, res) => {

  if (req.files.Picture == null)
    res.redirect('/');
  let uniqueTime = Date.now();
  let picture = req.files.Picture;
  let uploadPath = __dirname + '/src/upload/' + uniqueTime + picture.name;
  let shortUploadPath = './upload/' + uniqueTime + picture.name;

  picture.mv(uploadPath, (err) => {
    if (!req.files || Object.keys(req.files).length === 0 ) {
      alert('No files were uploaded');
    }
  })
  
  await dbOperations.uploadPicture(shortUploadPath);
  res.redirect("/");
});

app.post("/insert", async (req, res) => {
  await dbOperations.addReview(
    req.body.lastName,
    req.body.firstName,
    req.body.city,
    req.body.state,
    req.body.gender,
    req.body.age,
    req.body.overallRating,
    req.body.ethnicity,
    req.body.personality,
    req.body.humor,
    req.body.kindness,
    req.body.social,
    req.body.listening,
    req.body.respect,
    req.body.comments,
  );
  const result = await dbOperations.getDateInfo(
    req.body.lastName,
    req.body.firstName,
    req.body.city,
    req.body.state
  );
  res.send(result);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

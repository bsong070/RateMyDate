import "./App.css";
import React, { useRef, useState } from "react";
import Rating from '@material-ui/lab/Rating';

// add ethincity

const NewEntry = () => {
  // const [value, setValue] = useState({
  //   OverallRating: null
  // });
  // // Create ref 
  // const valueRef = useRef();
  // // Initialize ref
  // valueRef.current = value;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [onType, setOnType] = useState({
    LastName: "",
    FirstName: "",
    City: "",
    State: "",
    OverallRating: "",
    Ethnicity: "",
    Personality: "",
    Humor: "",
    Kindness: "",
    Social: "",
    Listening: "",
    Respect: "",
    Comments: "",
  });
  const [dateInfo, setDateInfo] = useState([]);



  const setInput = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setOnType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addNewReview = async (url) => {
    const newData = await fetch("/insert", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        lastName: onType.LastName,
        firstName: onType.FirstName,
        city: onType.City,
        state: onType.State,
        overallRating: onType.OverallRating,
        ethnicity: onType.Ethnicity,
        personality: onType.Personality,
        humor: onType.Humor,
        kindness: onType.Kindness,
        social: onType.Social,
        listening: onType.Listening,
        respect: onType.Respect,
        comments: onType.Comments,
      }),
    })
      .then((res) => res.json())
      .then(() => (window.location.href = "/uploadpicture"));
    console.log(newData);
    setDateInfo({
      LastName: newData[0].LastName,
      FirstName: newData[0].FirstName,
      City: newData[0].City,
      State: newData[0].State,
      OverallRating: newData[0].OverallRating,
      Ethnicity: newData[0].Ethnicity,
      Personality: newData[0].Personality,
      Humor: newData[0].Humor,
      Kindness: newData[0].Kindness,
      Social: newData[0].Social,
      Listening: newData[0].Listening,
      Respect: newData[0].Respect,
      Comments: newData[0].Comments,
    });
    console.log(dateInfo);
  };

  return (
    <div className="create">
      <h2>Add a new review</h2>
      <input
        name="LastName"
        placeholder="Last Name"
        onChange={setInput}
      ></input>
      <input
        name="FirstName"
        placeholder="First Name"
        onChange={setInput}
      ></input>
      <input name="City" placeholder="City" onChange={setInput}></input>
      <input name="State" placeholder="State" onChange={setInput}></input>
      <input
        name="Ethnicity"
        placeholder="Ethnicity"
        onChange={setInput}
      ></input>
      <input
        name="OverallRating"
        placeholder="Rating"
        onChange={setInput}
      ></input>
      <input
        name="Personality"
        placeholder="Personality"
        onChange={setInput}
      ></input>
      <input name="Humor" placeholder="Humor" onChange={setInput}></input>
      <input name="Kindness" placeholder="Kindness" onChange={setInput}></input>
      <input name="Social" placeholder="Social" onChange={setInput}></input>
      <input
        name="Listening"
        placeholder="Listening"
        onChange={setInput}
      ></input>
      <input name="Respect" placeholder="Respect" onChange={setInput}></input>
      <input name="Comments" placeholder="Comments" onChange={setInput}></input>
      <button
        onClick={() => {
          addNewReview();
        }}
      >
        Submit Review
      </button>

      <div>
        <form
          action="/uploadpicture"
          method="POST"
          encType="multipart/form-data"
        >
          <h3> Upload Profile Picture</h3>
          <input type="file" name="picture" accept="image/*" />
          <input type="submit" className="btn btn-primary"></input>
        </form>
      </div>


    {/* <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue({OverallRating: newValue});
          // Get the latest state
          console.log(valueRef.current);
        }}
      />
    </div> */}

<div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
    </div>
  );
};
export default NewEntry;

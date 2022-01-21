import "./App.css";
import React, { useRef, useState } from "react";
import {states, cities, ethnicity, gender} from './DropDownItem';

// add ethincity

const NewEntry = () => {

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
    Gender: "",
    Age: ""
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
        gender: onType.Gender,
        age: onType.Age
      }),
    })
      .then((res) => res.json())
      .then(() => (window.location.href = "/"));
    //   .then(() => (window.location.href = "/uploadpicture"));
    // console.log(newData);
    // setDateInfo({
    //   LastName: newData[0].LastName,
    //   FirstName: newData[0].FirstName,
    //   City: newData[0].City,
    //   State: newData[0].State,
    //   OverallRating: newData[0].OverallRating,
    //   Ethnicity: newData[0].Ethnicity,
    //   Personality: newData[0].Personality,
    //   Humor: newData[0].Humor,
    //   Kindness: newData[0].Kindness,
    //   Social: newData[0].Social,
    //   Listening: newData[0].Listening,
    //   Respect: newData[0].Respect,
    //   Comments: newData[0].Comments,
    //   Gender: newData[0].Gender,
    //   Age: newData[0].Age
    // });
    // console.log(dateInfo);
  };

  let DropDown = (name, dropDownBank) => {
    return (
      <div>
        <select name = {name} id = "list" onChange = {setInput}>
        {dropDownBank.map((item, index) => (
          <option value = {item}>{item}</option>
        ))}
        </select>
      </div>
    )
  }

  let StarRating = (name) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= onType[name] ? "on" : "off"}
              onClick={() => setOnType({...onType, [name]:index})}
            >
              <span className="star">&#9733;</span>
              {console.log(onType)}
            </button>
          );
        })}
      </div>
    );
  }

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
      {DropDown("State", states)}
      {DropDown("City", cities)}
      {DropDown("Ethnicity", ethnicity)}
      {DropDown("Gender", gender)}

      <input name="Age" placeholder="Age" onChange={setInput}></input>

      <p>Rating: </p>{StarRating("OverallRating")}
      <p>Personality: </p>{StarRating("Personality")}
      <p>Humor: </p>{StarRating("Humor")}
      <p>Kindness: </p>{StarRating("Kindness")}
      <p>Social: </p>{StarRating("Social")}
      <p>Listening: </p>{StarRating("Listening")}
      <p>Respect: </p>{StarRating("Respect")}

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

    </div>
  );
};
export default NewEntry;

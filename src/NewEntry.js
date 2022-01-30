import "./App.css";
import React, { useRef, useState } from "react";
import {states, cities, ethnicity, gender, age} from './DropDownItem';

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
      // .then(() => (window.location.href = "/"));
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

  let DropDown = (name, dropDownBank, defaultValue) => {
    return (
      <div>
        <select name = {name} id = "list" onChange = {setInput} defaultValue={defaultValue}>
        {dropDownBank.map((item, index) => (
          <option value = {item}>{item}</option>
        ))}
        </select>
      </div>
    )
  }

  let StarRating = (name) => {
    return (
      <div>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= onType[name] ? "on" : "off"}
              onClick={() => setOnType({...onType, [name]:index})}
            >
              <span>&#9733;</span>
              {console.log(onType)}
            </button>
          );
        })}
      </div>
    );
  }

  return (
<div class="container">
  <div class="row justify-content-center">
    <div class="col-4">
      <h2>Add a new review</h2>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
      <p>Last Name</p>
      </div>
    <div class="col-4">
    <input
        name="LastName"
        placeholder="Last Name"
        onChange={setInput}
      ></input>    
      </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
      <p>First Name</p>
      </div>
    <div class="col-4">
    <input
        name="FirstName"
        placeholder="First Name"
        onChange={setInput}
      ></input>
      </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
      <p>State</p>
    </div>
    <div class="col-4">
      {DropDown("State", states, states[0])} 
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
      <p>City</p>
    </div>
    <div class="col-4">
      {DropDown("City", cities, cities[0])}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Ethnicity</p>
    </div>
    <div class="col-4">
    {DropDown("Ethnicity", ethnicity, ethnicity[0])}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Gender</p>
    </div>
    <div class="col-4">
    {DropDown("Gender", gender, gender[0])}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Age</p>
    </div>
    <div class="col-4">
    {DropDown("Age", age, age[0])}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Rating: </p>    </div>
    <div class="col-4">
    {StarRating("OverallRating")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Personality: </p>
        </div>
    <div class="col-4">
    {StarRating("Personality")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Humorous: </p>        </div>
    <div class="col-4">
    {StarRating("Humor")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Kindness: </p>       
    </div>
    <div class="col-4">
    {StarRating("Kindness")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Sociable: </p>
    </div>
    <div class="col-4">
    {StarRating("Social")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Listening: </p>    </div>
    <div class="col-4">
    {StarRating("Listening")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Respect: </p>    
    </div>
    <div class="col-4">
    {StarRating("Respect")}
    </div>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-4'>
    <p>Comments: </p>    
    </div>
    <textarea name="Comments" placeholder="Comments" onChange={setInput}></textarea>
  </div>
  <div class="row justify-content-center">
    <div class = 'col-8'>
      <form action="/uploadpicture" method="POST" encType="multipart/form-data">
        <p>Upload Picture: </p>    
        <input type="file" name="Picture" accept="image/*"/>
      <button
      type = "submit"
      class="btn btn-secondary"
      onClick={() => {
          addNewReview();
        }}
      >
        Submit Review
      </button>
      </form>
    </div>
  </div>



</div>

  );
};
export default NewEntry;

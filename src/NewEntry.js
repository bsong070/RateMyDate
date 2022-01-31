import './index.css';
import React, { useState } from "react";
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
<br></br>
<br></br>
  <div class="row justify-content-start">
    <div class="col-4">
      <h2>Add a new review</h2><i class="fas fa-heart"></i>
    <br></br>
    <br></br>
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
      <h5>Last Name</h5>
      </div>
    <div class="col-4">
    <input
        name="LastName"
        placeholder="Last Name"
        onChange={setInput}
      ></input>    
      </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
      <h5>First Name</h5>
      </div>
    <div class="col-4">
    <input
        name="FirstName"
        placeholder="First Name"
        onChange={setInput}
      ></input>
      </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
      <h5>State</h5>
    </div>
    <div class="col-4">
      {DropDown("State", states, states[0])} 
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
      <h5>City</h5>
    </div>
    <div class="col-4">
      {DropDown("City", cities, cities[0])}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Ethnicity</h5>
    </div>
    <div class="col-4">
    {DropDown("Ethnicity", ethnicity, ethnicity[0])}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Gender</h5>
    </div>
    <div class="col-4">
    {DropDown("Gender", gender, gender[0])}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Age</h5>
    </div>
    <div class="col-4">
    {DropDown("Age", age, age[0])}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Rating: </h5>    </div>
    <div class="col-4">
    {StarRating("OverallRating")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Personality: </h5>
        </div>
    <div class="col-4">
    {StarRating("Personality")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Humor: </h5>        </div>
    <div class="col-4">
    {StarRating("Humor")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Kindness: </h5>       
    </div>
    <div class="col-4">
    {StarRating("Kindness")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Sociable: </h5>
    </div>
    <div class="col-4">
    {StarRating("Social")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Attentive: </h5>    </div>
    <div class="col-4">
    {StarRating("Listening")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-4'>
    <h5>Respectful: </h5>    
    </div>
    <div class="col-4">
    {StarRating("Respect")}
    </div>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-2'>
    <br></br>
    <h5>Comments: </h5>    
    </div>
    <textarea name="Comments" placeholder="Please add your comments here" onChange={setInput}></textarea>
  </div>
  <div class="row justify-content-start">
    <div class = 'col-8'>
    <br></br>
      <form action="/uploadpicture" method="POST" encType="multipart/form-data">
        <h5>Upload Picture: </h5>    
        <input type="file" name="Picture" accept="image/*"/>
        <br></br>
        <br></br>
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

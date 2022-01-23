import "./App.css";
import React, { useState, useEffect } from "react";
import {states, cities, ethnicity, gender, age} from './DropDownItem';

const Home = () => {
  const [onType, setOnType] = useState({
    LastName: "",
    FirstName: "",
    City: "",
    State: "",
  });
  
  const [dateInfo, setDateInfo] = useState([
    {
      ID: "",
      LastName: "",
      FirstName: "",
      City: "",
      State: "",
      OverallRating: "",
      Age: "",
      Gender: ""
    }
  ])

  const [viewReview, setViewReview] = useState(false);

  const [display, setDisplay] = useState([
    {
      ID: "",
      LastName: "",
      FirstName: "",
      City: "",
      State: "",
      OverallRating: "",
      Age: "",
      Gender: ""
    }
  ])

  const [review, setReview] = useState([
    {
      ID: "",
      LastName: "",
      FirstName: "",
      City: "",
      State: "",
      OverallRating: "",
      Age: "",
      Gender: ""
    }
  ])

  const [picStatus, setPicStatus] = useState(false);

  const setInput = (e) => {
    const { name, value } = e.target;
    
    setOnType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(onType);
  };

  const searchDateInfo = async (url) => {
    const newData = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        lastName: onType.LastName,
        firstName: onType.FirstName,
        city: onType.City,
        state: onType.State
      }),
    }).then(res => res.json())
    .then(res => {
      let resultArray = [];
      res.forEach((item) => {
        let indexObject = {};

        indexObject.ID = item.ID
        indexObject.LastName = item.LastName
        indexObject.FirstName = item.FirstName
        indexObject.City = item.City
        indexObject.State = item.State
        indexObject.OverallRating = item.OverallRating
        indexObject.Age = item.Age
        indexObject.Gender = item.Gender

        resultArray = resultArray.concat(indexObject);
        setDateInfo(resultArray);   
        setDisplay(resultArray);     
      })
    })
    setViewReview(false);
    // setPicStatus(true);
    console.log(dateInfo);
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

//add age

  let viewReviews = async(lastName, firstName, city, state) => {
    const newData = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        city: city,
        state: state
      }),
    }).then(res => res.json())
    .then(res => {
      let resultArray = [];
      res.forEach((item) => {
        let indexObject = {};

        indexObject.ID = item.ID
        indexObject.LastName = item.LastName
        indexObject.FirstName = item.FirstName
        indexObject.City = item.City
        indexObject.State = item.State
        indexObject.OverallRating = item.OverallRating
        indexObject.Age = item.Age
        indexObject.Gender = item.Gender
        indexObject.Ethnicity = item.Ethnicity
        indexObject.Personality = item.Personality
        indexObject.Humor = item.Humor
        indexObject.Kindness = item.Kindness
        indexObject.Social = item.Social
        indexObject.Listening = item.Listening
        indexObject.Respect = item.Respect
        indexObject.Comments = item.Comments
        indexObject.Age = item.Age

        resultArray = resultArray.concat(indexObject);
        setReview(resultArray);     
      })
    })
    console.log(newData)

    setViewReview(true);
    console.log(review)
  }


  let DisplaySearch = ({name, id}) => {
    return (
      <div>
      <button id = {name.ID} onClick = {() => viewReviews(name.LastName, name.FirstName, name.City, name.State)}>View All</button>
      <p> Id (DELETE) : {name.ID}</p>
        <p>Name: {name.FirstName} {name.LastName}</p>
        <p>Age: {name.Age}</p>
        <p>Gender: {name.Gender}</p>
        <p>Location: {name.City} {name.State}</p>
        <p>Ethnicity: {name.Ethnicity}</p>
        <p>Rating: {name.OverallRating}</p>
        <hr></hr>
      </div>
    )
  }

  let DisplayReview = ({name, id}) => {
    return (
      <div>
      <button id = {name.ID} onClick = {() => viewReviews(name.LastName, name.FirstName, name.City, name.State)}>View All</button>
      <p> Id (DELETE) : {name.ID}</p>
        <p>Name: {name.FirstName} {name.LastName}</p>
        <p>Age: {name.Age}</p>
        <p>Gender: {name.Gender}</p>
        <p>Location: {name.City} {name.State}</p>
        <p>Ethnicity: {name.Ethnicity}</p>
        <p>Rating: {name.OverallRating}</p>
        <p>Ethnicity: {name.Ethnicity}</p>
        <p>Humor: {name.Humor}</p>
        <p>Personality: {name.Personality}</p>
        <p>Kindness: {name.Kindness}</p>
        <p>Social: {name.Social}</p>
        <p>Listening: {name.Listening}</p>
        <p>Respect: {name.Respect}</p>
        <p>Comments: {name.Comments}</p>
        <p>Picture</p>
        <hr></hr>
      </div>
    )
  }

  // logic false true between display and review

  return (
    <div className="App">
    <div>
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
      {DropDown("City", cities)}
      {DropDown("State", states)}
    </div>

      {/* <p>
        Name: {dateInfo.FirstName} {dateInfo.LastName}
      </p>
      <p>
        Location: {dateInfo.City}, {dateInfo.State}
      </p> */}

      <button onClick={() => searchDateInfo()}>Search</button>

      {!viewReview
        ? dateInfo.map((result, key) => {
          return (
            <div key = {key}>
              <DisplaySearch name = {result} id = {key} />
            </div>
          )
        })
      : review.map((result,key) => {
        return (
          <div>
            <DisplayReview name = {result} id = {key} />
          </div>
        )
      })
      
    }
    <div>


    {/* {picStatus && dateInfo[0].Picture != null
       ? <img src = {require(`${dateInfo.Picture}`)} className = "photo"/>
       : <img src = {require('./upload/default.jpg')} className = "photo" />
    
    } */}

    </div>
    </div>
  );
};
export default Home;

import "./App.css";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [onType, setOnType] = useState({
    LastName: "",
    FirstName: "",
    City: "",
    State: "",
  });
  const [dateInfo, setDateInfo] = useState([]);
  const [picStatus, setPicStatus] = useState(false);

  const setInput = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setOnType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        firstName: onType.FastName,
        city: onType.City,
        state: onType.State,
      }),
    }).then((res) => res.json());
    console.log(newData[0]);
    setDateInfo({
      ID: newData[0].ID,
      LastName: newData[0].LastName,
      FirstName: newData[0].FirstName,
      City: newData[0].City,
      State: newData[0].State,
      OverallRating: newData[0].OverallRating,
      Personality: newData[0].Personality,
      Humor: newData[0].Humor,
      Kindness: newData[0].Kindness,
      Social: newData[0].Social,
      Listening: newData[0].Listening,
      Respect: newData[0].Respect,
      Picture: newData[0].Picture,
      Age: newData[0].Age,
      Gender: newData[0].Gender
    });
    setPicStatus(true);
    console.log(dateInfo);
  };

//add age

  let displaySearch = ({name}) => {
    return (
      <div>
        <p>Name: {name.FirstName} {name.LastName}</p>
        <p>Age: {name.Age}</p>
        <p>Gender: {name.Gender}</p>
        <p>Location: {name.City} {name.State}</p>
        <p>Ethnicity: {name.Ethnicity}</p>
        <p>Rating: {name.Rating}</p>
        <p>Comments: {name.Comments}</p>
      </div>
    )
  }

  return (
    <div className="App">
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
      <p>
        Name: {dateInfo.FirstName} {dateInfo.LastName}
      </p>
      <p>
        Location: {dateInfo.City}, {dateInfo.State}
      </p>
      <button onClick={() => searchDateInfo()}>Search</button>
    <div>
    {picStatus && dateInfo[0].Picture != null
       ? <img src = {require(`${dateInfo.Picture}`)} className = "photo"/>
       : <img src = {require('./upload/default.jpg')} className = "photo" />
    
    }
    </div>
    </div>
  );
};
export default Home;

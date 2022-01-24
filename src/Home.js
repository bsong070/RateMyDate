import "./App.css";
import React, { useState } from "react";
import {states, cities, ethnicity, gender, age} from './DropDownItem';

const Home = () => {
  const [onType, setOnType] = useState({
    LastName: "",
    FirstName: "",
    City: "",
    State: "",
  });
  
  // const [dateInfo, setDateInfo] = useState([
  //   {
  //     ID: "",
  //     LastName: "",
  //     FirstName: "",
  //     City: "",
  //     State: "",
  //     OverallRating: "",
  //     Age: "",
  //     Gender: ""
  //   }
  // ])

  let dateInfo;

  const [viewReview, setViewReview] = useState(false);

  let display = [
    {
      LastName: '',
      FirstName: '',
      City: '',
      State: '',
      Gender: '',
      Age: 0,
      OverallRating: '',
      count: 0
    }
  ];

  let displayFinal = [
    {
      LastName: '',
      FirstName: '',
      City: '',
      State: '',
      Gender: '',
      Age: 0,
      OverallRating: '',
      count: 0
    }
  ]
  const [review, setReview] = useState([
    {
      ID: "",
      LastName: "",
      FirstName: "",
      City: "",
      State: "",
      OverallRating: "",
      Age: 0,
      Gender: "",
      Count: 0
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
        console.log(resultArray)
        // setDateInfo(resultArray);   

        dateInfo = resultArray

        })
    })
    await loadDisplay()
    // setPicStatus(true);

    console.log(dateInfo)

  };

  let loadDisplay = async() => {
    for (let i = 0; i < dateInfo.length; i++) {
      for (let j = 0; j < display.length; j++) {
        if (display[i] == undefined) {
          display[i] = {
            LastName: '',
            FirstName: '',
            City: '',
            State: '',
            Gender: '',
            Age: 0,
            OverallRating: '',
            count: 0
          }
        }
        if (display[i-j].LastName == dateInfo[i].LastName 
          && display[i-j].FirstName == dateInfo[i].FirstName
          && display[i-j].City == dateInfo[i].City
          && display[i-j].State == dateInfo[i].State
          && display[i-j].Gender == dateInfo[i].Gender
          ){
            display[i-j].Age = (display[i-j].Age*display[i-j].count + dateInfo[i].Age) / (display[i-j].count + 1);
            display[i-j].OverallRating = (display[i-j].OverallRating*display[i-j].count + dateInfo[i].OverallRating) / (display[i-j].count + 1);
            display[i-j].count++;
            break;
          } else if (j == display.length - 1){ 
            display[i].LastName = dateInfo[i].LastName
            display[i].FirstName = dateInfo[i].FirstName
            display[i].City = dateInfo[i].City
            display[i].State = dateInfo[i].State
            display[i].Gender = dateInfo[i].Gender
            display[i].Age = dateInfo[i].Age
            display[i].OverallRating = dateInfo[i].OverallRating
            display[i].count = 1
          }   
        }
      }
    let copyIndices = [];
    for (let i=0; i<display.length; i++)
      if (display[i].FirstName != '') 
        copyIndices.push(i);

    console.log(copyIndices);
    console.log(display);

    for (let i=0; i < copyIndices.length; i++){
      if(displayFinal[i] == undefined){
        displayFinal[i] = {
            LastName: '',
            FirstName: '',
            City: '',
            State: '',
            Gender: '',
            Age: 0,
            OverallRating: '',
            count: 0
          }
      }
      displayFinal[i] = display[copyIndices[i]]
    }
    console.log(displayFinal);
    setViewReview(false);
  }

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

      <hr></hr>


      {!viewReview
        ? displayFinal.map((result, key) => {
          return (
            <div>
            {console.log(result)}
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

        {/* ? dateInfo.map((result, key) => {
          return (
            <div key = {key}>
              <DisplaySearch name = {result} id = {key} />
            </div>
          )
        }) */}


    {/* {picStatus && dateInfo[0].Picture != null
       ? <img src = {require(`${dateInfo.Picture}`)} className = "photo"/>
       : <img src = {require('./upload/default.jpg')} className = "photo" />
    
    } */}

    </div>
    </div>
  );
};
export default Home;

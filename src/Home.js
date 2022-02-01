import './index.css';
import React, { useState } from "react";
import {states, cities} from './DropDownItem';

const Home = () => {
  const [onType, setOnType] = useState({
    LastName: "",
    FirstName: "",
    City: "",
    State: "",
  });

  let [displayFinal,setDisplayFinal] = useState([])

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
  
  const [viewReview, setViewReview] = useState(false);
  
  let dateInfo;

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


  const setInput = (e) => {
    const { name, value } = e.target;
    
    setOnType((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const searchDateInfo = async () => {
    await fetch("/api", {
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
        indexObject.Ethnicity = item.Ethnicity
        indexObject.OverallRating = item.OverallRating
        indexObject.Age = item.Age
        indexObject.Gender = item.Gender
        indexObject.Picture = item.Picture

        resultArray = resultArray.concat(indexObject);

        dateInfo = resultArray
        })
    })
    loadDisplay()
  };

  let loadDisplay = () => {
    for (let i = 0; i < dateInfo.length; i++) {
      for (let j = 0; j < display.length; j++) {
        if (display[i] == undefined) {
          display[i] = {
            LastName: '',
            FirstName: '',
            City: '',
            State: '',
            Gender: '',
            Ethnicity: '',
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
          && display[i-j].Ethnicity == dateInfo[i].Ethnicity
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
            display[i].Ethnicity = dateInfo[i].Ethnicity
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

    let tempArray = [];

    for (let i=0; i < copyIndices.length; i++){
        let tempResult = {}
        tempResult.LastName = display[copyIndices[i]].LastName
        tempResult.FirstName = display[copyIndices[i]].FirstName
        tempResult.City = display[copyIndices[i]].City
        tempResult.State = display[copyIndices[i]].State
        tempResult.Gender = display[copyIndices[i]].Gender
        tempResult.Ethnicity = display[copyIndices[i]].Ethnicity
        tempResult.Age = display[copyIndices[i]].Age
        tempResult.OverallRating = display[copyIndices[i]].OverallRating
        tempResult.count = display[copyIndices[i]].count

        tempArray = tempArray.concat(tempResult);
        setDisplayFinal(tempArray);
          }
    setDisplayFinal(tempArray);
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


  let viewReviews = async(lastName, firstName, city, state) => {
    await fetch("/api", {
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
        indexObject.Picture = item.Picture

        resultArray = resultArray.concat(indexObject);
        setReview(resultArray);     
      })
    })
    setViewReview(true);
  }


  let DisplaySearch = ({name}) => {
    return (

<div class="container">
  <div class="row justify-content-start">
    <div class="col-2">
    <p>{name.FirstName} {name.LastName}</p>
    </div>
    <div class="col-1">
    <p>{name.Age}</p>
    </div>
    <div class="col-2">
    <p>{name.Gender}</p>
    </div>
    <div class="col-2">
    <p>{name.City}, {name.State}</p>
    </div>
    <div class="col-2">
    <p>{name.Ethnicity}</p>
    </div>
    <div class="col-2">
    <p>{name.OverallRating}</p>
    </div>
    <div class="col-1">
    <button type="button" class="btn btn-dark"  id = {name.ID} onClick = {() => viewReviews(name.LastName, name.FirstName, name.City, name.State)}>View All</button>
    </div>
    </div>
    <br></br>
</div>
    )
  }

  let DisplayReview = ({name}) => {
    return (
      <div>
      <div class="container border rounded bg-gradient">
      <br></br>
        <div class="row justify-content-start">
        <div class="col-2">
          <p>OverallRating</p>
          </div>
          <div class="col-2">
          <p>Picture</p>
          </div>
          <div class="col-2">
          <p>Comments</p>
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2">
          <p>{name.OverallRating}</p>
          </div>
          <div class="col-2">
          {name.Picture != null
          ? <img src = {require(`${name.Picture}`)} className = "photo"/>
          : <img src = {require('./upload/default.jpg')} className = "photo"/>
          }
          <br></br>
          <br></br>
          </div>
          <div class="col-8">
          <p>{name.Comments}</p>
          </div>
        </div>
          <div class="row justify-content-center">
          <div class = 'col-2'>
            <p>Personality</p>
          </div>
          <div class = 'col-2'>
            <p>Humor</p>
          </div>
          <div class = 'col-2'>
            <p>Kindness</p>
          </div>
          <div class = 'col-2'>
            <p>Sociable</p>
          </div>
          <div class = 'col-2'>
            <p>Attentive</p>
          </div>
          <div class = 'col-2'>
            <p>Respectful</p>
          </div>
          <div class="col-2">
          <p>{name.Personality}</p>
          </div>
          <div class="col-2">
          <p>{name.Humor}</p>
          </div>
          <div class="col-2">
          <p>{name.Kindness}</p>
          </div>
          <div class="col-2">
          <p>{name.Social}</p>
          </div>
          <div class="col-2">
          <p>{name.Listening}</p>
          </div>
          <div class="col-2">
        <p>{name.Respect}</p>
          </div>
        </div>
        </div>
        <br></br>
        </div>
    )
  }

  let RatingDisplay = () => {
    return (
      <div class="row justify-content-start">
    <hr></hr>
    <div class = 'col-2'>
      <p>Name</p>
    </div>
    <div class = 'col-1'>
      <p>Age</p>
    </div>
    <div class = 'col-2'>
      <p>Gender</p>
    </div>
    <div class = 'col-2'>
      <p>Location</p>
    </div>
    <div class = 'col-2'>
      <p>Ethnicity</p>
    </div>
    <div class = 'col-2'>
      <p>Average Rating</p>
    </div>
</div>
    )
  }

  return (

<div class="container">
    <br></br>
    <br></br>
    <br></br>
    <div class="row justify-content-center">
    <div class="col-4">
      <h2>Lookup Date Database</h2>
    <br></br>
    <br></br>
    <br></br>
    </div>
    <div class="col-6">
    <h2></h2>    
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-2">
    <input
        name="FirstName"
        placeholder="First Name"
        onChange={setInput}
      ></input>    
    </div>
    <br></br>
    <br></br>
    <div class="col-2">
    <input
        name="LastName"
        placeholder="Last Name"
        onChange={setInput}
      ></input>
    </div>
    <div class="col-2">
    {DropDown("City", cities)}
    </div>
    <div class="col-2">
    {DropDown("State", states)}
    </div>
    <div class="col-2">
      <button type="button" class="btn btn-dark d-grid gap-2 col-6 mx-auto" onClick={() => searchDateInfo()}>Search</button>
    </div>
  </div>

<br></br>
<br></br>
<br></br>
<br></br>
 {!viewReview ? 
 displayFinal.map((result, key) => {
     return (
       <div>
  <RatingDisplay />
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
 </div>
  )
}
export default Home;
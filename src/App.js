// src/App.js

import { useEffect, useState } from "react";
import "./App.css";
import TextBox from "./TextBox";

function App() {

  let description = "This is a description.";
  let question = "Huh?";
  let title = "Welcome to the world of Terraquor!";
  let options = [{option: "option1", action: () => {alert('option 1 clicked')}},
  {option: "option2", action: () => {alert('option 2 clicked')}},
  {option: "option3", action: () => {alert('option 3 clicked')}},
  {option: "option4", action: () => {alert('option 4 clicked')}},
  {option: "option5", action: () => {alert('option 5 clicked')}},
  {option: "option6", action: () => {alert('option 6 clicked')}}];
  
  return (
    <div className="App" style={{backgroundImage: "url(/titleImage.jpg)"}}>
      <TextBox options = {options} description={description} question={question} title={title}/>
    </div>
  );
}
export default App;


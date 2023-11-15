import { useEffect, useState } from "react";
import "./App.css";
import TextBox from "./TextBox";

function App() {

  //These are all exampe variables. These will eventually be set in a different js file with all the logic begind them included
  //They are used in order to familiarize with the way components work in React
  let description = "You awaken in the heart of a lush forest surrounded by tall, ancient trees. You see the faint glow of a small Elven village to the north, an Athenian city to the west, Nomadic camps to the east, and the Dwarven kingdom to the north.";
  let question = "Which path will you choose?";
  let title = "Welcome to the World of Terraquor!";
  //the "options" array has json elements. This will make accessing these elements similar to accessing our json element 
  //during gameplay. The goal is to put the user data in Json, or some object oriented structure, so that we can 
  //update the state off the App.js page efforlessly, and use events to do so. We should eventually be getting all the 
  //data on the App.js page from the games state, and update that state with the logic of a different js file.
  let options = [{option: "Head towards the Elven village", action: () => {alert('option 1 clicked')}},
  {option: "Make your way to the Athenian city", action: () => {alert('option 2 clicked')}},
  {option: "Journey east to the Nomadic camps", action: () => {alert('option 3 clicked')}},
  {option: "Embark towards the Dwarven kingdom in the north", action: () => {alert('option 4 clicked')}}];
  
  //This is a simple outline for the game, with an example image. This image can, of course, be modified by a js file,
  //or dynamically rendered to some kind of state data.
  return (
    <div className="App" style={{backgroundImage: "url(/titleImage.jpg)"}}>
      {/* The code for this TextBox element is contained in the TextBox.jsx file in the src folder. 
      The .jsx extension is the same thing as a .js extension, the logo just looks cooler, and using
      .jsx for all components we create will make it easier to navigate between logic(.js files) and
      components(.jsx files)*/}
      <TextBox options = {options} description={description} question={question} title={title}/>
    </div>
  );
}
export default App;


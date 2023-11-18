import { useEffect, useState } from "react";
import "./App.css";
import TextBox from "./TextBox";

import worldData from './worldData.json';



function App() {
  //================================================================================================================
  //STATE
  //================================================================================================================
  //These are all state variables. Updated any of these with the set function(setDescription(), setOptions(), etc.) will dynamycally render the info
  //Basically, we can use classes, and update the data in our classes, but those will not dynamically render anything.
  //When we want to render something, we need to use some sort of button or interactable item that uses our classes to update
  //one of these state variables.
  const [description, setDescription] = useState(worldData.worlds[0].entryDescription);
  const [options, setOptions] = useState([
    {option: worldData.worlds[0].entryChoices[0].text, 
      action: () => {me.travel(worldData.worlds[0].entryChoices[0].travelDestination)}},
    {option: worldData.worlds[0].entryChoices[1].text, 
      action: () => {me.travel(worldData.worlds[0].entryChoices[1].travelDestination)}},
    {option: worldData.worlds[0].entryChoices[2].text, 
      action: () => {me.travel(worldData.worlds[0].entryChoices[2].travelDestination)}},
    {option: worldData.worlds[0].entryChoices[3].text, 
      action: () => {me.travel(worldData.worlds[0].entryChoices[3].travelDestination)}}]);
  const [question, setQuestion] = useState(worldData.worlds[0].entryQuestion);
  const [title, setTitle] = useState(worldData.worlds[0].entryTitle);
  const [boxVis, setBoxVis] = useState(1);
  const [image, setImage] = useState({backgroundImage: worldData.worlds[0].entryImage});
  //================================================================================================================
  //FUNCTIONS
  //================================================================================================================
  
  //================================================================================================================
  //CLASSES
  //================================================================================================================
  class Player {
    constructor(name, level) {
      this.name = name;
      this.level = level;
      this.inventory = [];
      this.weapon = 0;
      this.travel = (cityId) => {
        setBoxVis(() => 0);
        // World ids are as follows
        //0 -> Start
        //1 -> Athenian City
        //2 -> Dwarven Kingdom
        // 3 -> Elven Villiage
        //4 -> Nomad Camps
        if(cityId == 1) {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(() => worldData.worlds[1].entryDescription);
          setTitle(() => worldData.worlds[1].entryTitle);
          setQuestion(() => worldData.worlds[1].entryQuestion);
          setImage(() => ({backgroundImage: "url(/athenian.jpg)"}));
        }else if(cityId == 2) {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds[2].entryDescription);
          setTitle(() => worldData.worlds[2].entryTitle);
          setQuestion(worldData.worlds[2].entryQuestion);
          setImage(() => ({backgroundImage: "url(/dwarf.jpg)"}));
        }else if(cityId == 3) {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds[3].entryDescription);
          setTitle(() => worldData.worlds[3].entryTitle);
          setQuestion(worldData.worlds[3].entryQuestion);
          setImage(() => ({backgroundImage: "url(/elf.jpg)"}));
        }else if(cityId == 4) {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds[4].entryDescription);
          setTitle(() => worldData.worlds[4].entryTitle);
          setQuestion(worldData.worlds[4].entryQuestion);
          setImage(() => ({backgroundImage: "url(/nomad.jpg)"}));
        }else {
          setTitle(() => worldData.worlds[0].entryTitle);
          setDescription(() => worldData.worlds[0].entryDescription);
          setQuestion(() => worldData.worlds[0].entryQuestion);
          setOptions(() => [
            {option: worldData.worlds[0].entryChoices[0].text, 
              action: () => {me.travel(worldData.worlds[0].entryChoices[0].travelDestination)}},
            {option: worldData.worlds[0].entryChoices[1].text, 
              action: () => {me.travel(worldData.worlds[0].entryChoices[1].travelDestination)}},
            {option: worldData.worlds[0].entryChoices[2].text, 
              action: () => {me.travel(worldData.worlds[0].entryChoices[2].travelDestination)}},
            {option: worldData.worlds[0].entryChoices[3].text, 
              action: () => {me.travel(worldData.worlds[0].entryChoices[3].travelDestination)}}])
          setImage(() => ({backgroundImage: worldData.worlds[0].entryImage}));
        }
      } 
    }
  }

  //================================================================================================================
  //INITIALIZATION
  //================================================================================================================
  const me = new Player("John", 0);

  //================================================================================================================
  //RENDERING
  //================================================================================================================
  //This is a simple outline for the game, with an example image. This image can, of course, be modified by a js file,
  //or dynamically rendered to some kind of state data.
  return (
    <div className="App" style={image}>
      {/* The code for this TextBox element is contained in the TextBox.jsx file in the src folder. 
      The .jsx extension is the same thing as a .js extension, the logo just looks cooler, and using
      .jsx for all components we create will make it easier to navigate between logic(.js files) and
      components(.jsx files)*/}
      {!boxVis ? <button onClick={() => setBoxVis(() => 1)}>Hello</button> : null}
      <div class="vertical-center">
        {boxVis ? <TextBox options={options} description={description} question={question} title={title}/> : null}
      </div>
    </div>
  );
}
export default App;


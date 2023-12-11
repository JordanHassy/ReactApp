import { useRef, useEffect, useState } from "react";
import "./App.css";
import TextBox from "./TextBox";

import worldData from './worldData.json';

// [
//   {option: worldData.rooms[0].choices[0].text, 
//     action: () => {me.travel(worldData.rooms[0].choices[0].travelDestination)}},
//   {option: worldData.rooms[0].choices[1].text, 
//     action: () => {me.travel(worldData.rooms[0].choices[1].travelDestination)}},
//   {option: worldData.rooms[0].choices[2].text, 
//     action: () => {me.travel(worldData.rooms[0].choices[2].travelDestination)}},
//   {option: worldData.rooms[0].choices[3].text, 
//     action: () => {me.travel(worldData.rooms[0].choices[3].travelDestination)}}]

function App() {
  //================================================================================================================
  //STATE
  //================================================================================================================
  //These are all state variables. Updated any of these with the set function(setDescription(), setOptions(), etc.) will dynamycally render the info
  //Basically, we can use classes, and update the data in our classes, but those will not dynamically render anything.
  //When we want to render something, we need to use some sort of button or interactable item that uses our classes to update
  //one of these state variables.
  const [description, setDescription] = useState(worldData.rooms[0].description);
  const [options, setOptions] = useState(worldData.rooms[0].choices.map(choicesMap));
  const [question, setQuestion] = useState(worldData.rooms[0].question);
  const [title, setTitle] = useState(worldData.rooms[0].title);
  const [boxVis, setBoxVis] = useState(1);
  const [image, setImage] = useState({backgroundImage: worldData.rooms[0].image});
  const [done, setDone] = useState(0);
  //visited uses bit manipulation to test if room is visited. if room id bit is on, it has been 
  //visited, and therefore text will not roll out in rollOutText
  let visited = 1;

  //uses same logic as above but with NPCs.
  let spokenTo = 0;
  //================================================================================================================
  //FUNCTIONS
  //================================================================================================================
  
  function choicesMap(obj) {
    return {
      option: obj.text,
      action: () => {me.travel(obj.travelDestination)}
    };
  }

  async function sleep(milliseconds) {
    return new Promise(resolve=>setTimeout(resolve, milliseconds));
  }

  async function rollOutText(roomID) {
    let description = worldData.rooms[roomID].description;
    let question = worldData.rooms[roomID].question;
    let options = worldData.rooms[roomID].choices.map(choicesMap);

    console.log(question);
    setDescription();
    setOptions(() =>[]);
    setQuestion();
    console.log(visited);
    console.log(1 << roomID);
    console.log(visited & (1 << roomID));
    if((visited & (1 << roomID)) != 0) {
      setDescription(() => description);
      setQuestion(() => question);
    }else {
      let i = 0;
      while(i <= description.length) {
        if(description[i-2] === '.') {
          await sleep(1000);
        }
        if(description[i-2] === ',') {
          await sleep(300);
        }
        setDescription(() => description.substring(0, i));
        
        //text rolls out faster for longer text
        await sleep(1000/description.length + description.length/(description.length/10));
        i += 1;
      }
      i = 0;
      while(i <= question.length) {
        setQuestion(() => question.substring(0, i));
        await sleep(1000/question.length);
        i += 1;
      }
    }

    setOptions(() => options);

  }
  //================================================================================================================
  //CLASSES
  //================================================================================================================
  class Player {
    constructor(name, level) {
      this.name = name;
      this.level = level;
      this.inventory = [];
      this.weapon = 0;
      //set title and description to corresponding for the world
      //only roll out that text if world is unvisited.
      //set options to map to all options for that world
      this.travel = (roomId) => {
        setTitle(() => worldData.rooms[roomId].title);
        setImage(() => {return {backgroundImage: worldData.rooms[roomId].image};});

        rollOutText(roomId);
        visited = visited | (1 << roomId);
      };
      this.equipItem = (itemId) => {
        this.inventory.push(itemId);
      }
    }
  }

  //================================================================================================================
  //STORY
  //================================================================================================================
  const me = new Player("Finnrick", 0);


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
      <button onClick={() => setBoxVis(() => !boxVis)}>Hide/Show Text Box</button>
      <div class="vertical-center">
        {boxVis ? <TextBox options={options} description={description} question={question} title={title}/> : null}
      </div>

      <div class="inventory">
        <button onClick={() => {
          setBoxVis(() => !boxVis);
        }} class="inventory-button"><img src="backpack.png" class="inventory-image" width={"100%"} height={"100%"}/></button>
      </div>
      <div class="weapon">
        <button onClick={() => {
          setBoxVis(() => !boxVis);
        }} class="inventory-button"><img src="sword.png" class="inventory-image" width={"100%"} height={"100%"}/></button>
      </div>
    </div>
  );
}
export default App;


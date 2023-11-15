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
  const [description, setDescription] = useState("You awaken in the heart of a lush forest surrounded by tall, ancient trees. You see the faint glow of a small Elven village to the north, an Athenian city to the west, Nomadic camps to the east, and the Dwarven kingdom to the north.");
  const [options, setOptions] = useState([
    {option: "Head towards the Elven village", action: () => {me.travel("Elf")}},
    {option: "Make your way to the Athenian city", action: () => {me.travel("Athenian")}},
    {option: "Journey east to the Nomadic camps", action: () => {me.travel("Nomad")}},
    {option: "Embark towards the Dwarven kingdom in the north", action: () => {me.travel("Dwarf")}}]);
  const [question, setQuestion] = useState("Which path will you choose?");
  const [title, setTitle] = useState("Welcome to the World of Terraquor!");
  const [boxVis, setBoxVis] = useState(1);
  const [image, setImage] = useState({backgroundImage: "url(/titleImage.jpg)"});
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
      this.travel = (city) => {
        if(city == "Athenian") {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(() => worldData.worlds.Athenian.entryDescription);
          setTitle(() => worldData.worlds.Athenian.entryTitle);
          setQuestion(() => worldData.worlds.Athenian.entryQuestion);
          setImage(() => ({backgroundImage: "url(/athenian.jpg)"}));
        }else if(city == "Dwarf") {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds.Dwarf.entryDescription);
          setTitle(() => worldData.worlds.Dwarf.entryTitle);
          setQuestion(worldData.worlds.Dwarf.entryQuestion);
          setImage(() => ({backgroundImage: "url(/dwarf.jpg)"}));
        }else if(city == "Elf") {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds.Elf.entryDescription);
          setTitle(() => worldData.worlds.Elf.entryTitle);
          setQuestion(worldData.worlds.Elf.entryQuestion);
          setImage(() => ({backgroundImage: "url(/elf.jpg)"}));
        }else if(city == "Nomad") {
          setOptions(() => [{option: "return home", action: () => {me.travel()}}]);
          setDescription(worldData.worlds.Nomad.entryDescription);
          setTitle(() => worldData.worlds.Nomad.entryTitle);
          setQuestion(worldData.worlds.Nomad.entryQuestion);
          setImage(() => ({backgroundImage: "url(/nomad.jpg)"}));
        }else {
          setTitle(() => "Home");
          setDescription();
          setQuestion();
          setOptions(() => [
            {option: "Head towards the Elven village", action: () => {me.travel("Elf")}},
            {option: "Make your way to the Athenian city", action: () => {me.travel("Athenian")}},
            {option: "Journey east to the Nomadic camps", action: () => {me.travel("Nomad")}},
            {option: "Embark towards the Dwarven kingdom in the north", action: () => {me.travel("Dwarf")}}])
          setImage(() => ({backgroundImage: "url(/titleImage.jpg)"}));
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
      {boxVis ? <TextBox options={options} description={description} question={question} title={title}/> : null}
    </div>
  );
}
export default App;


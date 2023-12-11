import { useState } from "react";
import "./App.css";
import TextBox from "./TextBox";
import InventoryBox from "./InventoryBox";
import WeaponBox from "./WeaponBox";

import worldData from './worldData.json';
import { type } from "@testing-library/user-event/dist/type";

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
  const [hp, setHp] = useState(100);
  const [enemy_hp, setEnemyHp] = useState(100);
  const [enemyVis, setEnemyVis] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [inventoryVis, setInventoryVis] = useState(0);
  const [weapon, setWeapon] = useState("Fists");
  const [weaponVis, setWeaponVis] = useState(0);
  //visited uses bit manipulation to test if room is visited. if room id bit is on, it has been 
  //visited, and therefore text will not roll out in rollOutText
  let visited = 1;

  //uses same logic as above but with NPCs.
  let spokenTo = 0;

  //holds the last world we were at
  let currentWorld = 0;

  let ehp = 0;

  //================================================================================================================
  //FUNCTIONS
  //================================================================================================================
  
  function choicesMap(obj) {
    if(obj.travelDestination !== -1) {
      return {
      option: obj.text,
      action: () => {me.travel(obj.travelDestination)}
      };
    }else if(obj.itemId !== -1) {
      console.log(obj.itemId)
      return {
        option: obj.text,
        action: () => {me.equipItem(obj.itemId)}
      };
    }else if(obj.npcId !== -1) {
      return {
        option: obj.text,
        action: () => {me.interact(obj.npcId)}
      }
    }else if(obj.weaponId !== -1) {
      return {
        option: obj.text,
        action: () => {me.equipWeapon(obj.weaponId)}
      }
    }
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
    if((visited & (1 << roomID)) != 0 && roomID !== 21) {
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
      this.hp = 100;
      this.name = name;
      this.level = level;
      this.inventory = [];
      this.weapon = 0;
      //set title and description to corresponding for the world
      //only roll out that text if world is unvisited.
      //set options to map to all options for that world
      this.travel = async (roomId) => {
        console.log(this.inventory);
        if(roomId.constructor === Array) {
          if(roomId[0] === 0) { //if you are given an item
            this.equipItem(roomId[1]);
            this.travel(roomId[2]);
          }else if (roomId[0] === 1) {//if you are given a weapon
            this.equipWeapon(roomId[1]);
            this.travel(roomId[2]);
          }else if (roomId[0] === 2) {//if you are in a battle
            let youDiedIndex = 24; //index of the You Died world
            if(roomId[1] === 0) { // if you are attacking
              ehp -= worldData.weapons[this.weapon].damage;
              setEnemyHp(() => ehp);
              await sleep(2000);
              if(ehp > 0) { //enemy is still alive
                this.hp -= roomId[3]
                setHp(() => this.hp);
                if(this.hp <= 0) {
                  this.travel(youDiedIndex);
                }else {
                  this.travel(roomId[4]);
                }
              }else { // you beat the enemy!
                this.travel(roomId[5]);
                await sleep(2000);
                setEnemyVis(() => 0);
              }
            }else if (roomId[1] === 1) { // if you are using an item
              if(this.inventory.includes(2)) { //if you have a healing potion
                this.inventory = this.inventory.filter(i => i !== 2);
                setDescription(() => "You used a healing potion");
                if(this.hp <50) {
                  this.hp += 50
                }else {
                  this.hp = 100;
                }
                setHp(() => this.hp);
                setOptions(() => []);
                setQuestion(() => "");
                await sleep(2000);
                
                this.hp -= roomId[3];
                setHp(() => hp - roomId[3]);
                if(this.hp <= 0) {
                  this.travel(youDiedIndex);
                }else {this.travel(roomId[4]);}

              } else {//if you don't
                setDescription(() => "You don't have any heals, silly!");
                setOptions(() => []);
                setQuestion(() => "");
                await sleep(2000);
                
                this.hp -= roomId[3];
                setHp(() => this.hp);
                if(this.hp <= 0) {
                  this.travel(youDiedIndex); //travel to you died screen
                }else {
                  this.travel(roomId[4]);
                }
              }
            }
          }
          return;
        }
        //room is locked
        if(worldData.rooms[roomId].keyId !== -1) {
          let isInInventory = false;
          for(let i = 0; i < this.inventory.length; i++) {
            if(this.inventory[i] == worldData.rooms[roomId].keyId) {
              isInInventory = true;
              break;
            }
          }
          if(!isInInventory) {
            alert("This room is locked :(");
            return;
          }
        }

        setTitle(() => worldData.rooms[roomId].title);
        setImage(() => {return {backgroundImage: worldData.rooms[roomId].image};});

        rollOutText(roomId);
        visited = visited | (1 << roomId);
      };
      this.equipItem = (itemId) => {
        console.log("HI again")
        if(itemId in this.inventory) {
          alert("You already have this item.");
          return;
        }
        this.inventory.push(itemId);
        let dynamicInventory = [];
        for(let j = 0; j < this.inventory.length; j++) {
          dynamicInventory.push(worldData.items[this.inventory[j]].name);
        }
        alert("Item equipped");
        setInventory(() => dynamicInventory);
        // let itemName = worldData.items[itemId].name;
        // alert(itemName + " Equipped");
      };
      this.equipWeapon = (weaponId) => {
        if(this.weapon === weaponId) {
          alert("You already have this weapon");
          return;
        }
        alert("You are no longer using " + worldData.weapons[this.weapon].name);
        this.weapon = weaponId;
        let weaponName = worldData.weapons[weaponId].name
        setWeapon(() => weaponName);
      };
      this.interact = async (npcId) => {
        if(worldData.npcs[npcId].hp > 0) {
          setEnemyHp(() => worldData.npcs[npcId].hp);
          ehp = worldData.npcs[npcId].hp;
          setEnemyVis(() => 1);
        }
        let dialogue = worldData.npcs[npcId].dialogue;
        if(spokenTo & (1 << npcId)) {
          this.travel(dialogue[1]);
        }else {
          spokenTo = spokenTo | (1 << npcId);
          this.travel(dialogue[0]);
        }

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
    <div className="App" >
      <div class="image_class" style={image}>
        {/* The code for this TextBox element is contained in the TextBox.jsx file in the src folder. 
        The .jsx extension is the same thing as a .js extension, the logo just looks cooler, and using
        .jsx for all components we create will make it easier to navigate between logic(.js files) and
        components(.jsx files)*/}
        <button onClick={() => setBoxVis(() => !boxVis)}>Hide/Show Text Box</button>
        <div class="vertical-center">
          {boxVis ? <TextBox options={options} description={description} question={question} title={title}/> : null}
        </div>

        <div class="vertical-center">
          {inventoryVis ? <InventoryBox items={inventory}/> : null}
        </div>

        <div class="vertical-center">
          {weaponVis ? <WeaponBox item={weapon}/> : null}
        </div>

        <div class="inventory">
          <button onClick={() => {
            if(boxVis) {
              setBoxVis(() => 0);
            }else if(weaponVis) {
              setWeaponVis(() => 0);
            } else {
              setBoxVis(() => 1);
              setInventoryVis(() => 0);
              return;
            }
            setInventoryVis(() => 1);
          }} class="inventory-button"><img src="backpack.png" class="inventory-image" width={"100%"} height={"100%"}/></button>
        </div>

        <div class="weapon">
          <button onClick={() => {
            if(boxVis) {
              setBoxVis(() => 0);
            }else if(inventoryVis) {
              setInventoryVis(() => 0);
            } else {
              setBoxVis(() => 1);
              setWeaponVis(() => 0);
              return;
            }

            setWeaponVis(() => 1);
          }} class="inventory-button"><img src="sword.png" class="inventory-image" width={"100%"} height={"100%"}/></button>
        </div>
        
        <div class="hp-num">
          <h1>HP: {hp}</h1>
        </div>

        <div class="enemy-hp-num">
          {enemyVis ? <h1>ENEMY HP: {enemy_hp}</h1> : null}
        </div>
      </div>
    </div>
  );
}
export default App;


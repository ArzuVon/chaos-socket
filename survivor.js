const { io } = require('socket.io-client');
const survivor = io("ws://localhost:1963");
const chance = require('chance');
const Chance = new chance();

let survivorArr = [];

// Blueprint for survivor object
class Survivor {
  constructor(profession, strength, agility, intelligence, health, name, status) {
    this.profession = profession;
    this.strength = strength;
    this.agililty = agility;
    this.intelligence = intelligence;
    this.health = health;
    this.name = name;
    this.status = status;
  }
}

function generateSurvivors(n) {
  console.log("survivors generated");
  for (let i = 0; i < n; i++) { // generate n survivors.
    const survivor = new Survivor(
      this.name = Chance.name(),
      this.profession = Chance.profession(),
      this.strength = Chance.natural({ min: 0, max: 10 }),
      this.agility = Chance.natural({ min: 0, max: 10 }),
      this.intelligence = Chance.natural({ min: 0, max: 10 }),
      this.health = Chance.natural({ min: 0, max: 10 }),
      this.status = 'Alive',
    );
    survivorArr.push(survivor);
  }
} generateSurvivors(2);
console.log("----------->", survivorArr);

// survivor stat check
async function skillCheck (survivor, catastrophe){
    if (survivor.strength < catastrophe.strReq && survivor.agility < catastrophe.dexReq && survivor.intelligence < catastrophe.intReq){
        takesDamage(survivor, catastrophe.damage);
    } else if(survivor.strength > catastrophe.strReq && survivor.agility > catastrophe.){

    }
}

// Survivors takes damage. If health drops below zero, survivor dies. If health drops and survivor survives, survivor gains 1 to each stat.
async function takesDamage(survivor, damage) {
  for (let i = 0; i < survivorArr.length; i++) {
    survivorArr[i].health = survivorArr[i].health - damage;
    if (survivorArr[i] <= 0) {
      survivorArr[i].slice[i];
      console.log(`Survivor ${survivorArr[i].name} didn't survive`)
    } else {
      survivorArr[i].strength = survivorArr[i].strength + 1;
      survivorArr[i].agililty = survivorArr[i].agililty + 1;
      survivorArr[i].intelligence = survivorArr[i].intelligence + 1;
    };
  };
};

survivor.on('takes damage', (survivor) => {
  let status = takesDamage(survivor);
  survivor.emit('survivor status', (status));
});
survivor.on('', (order) => {
  survivor.emit('', (order));
});
survivor.on('', (order) => {
  survivor.emit('', (order));
});
survivor.on('', (order) => {
  survivor.emit('', (order));
});

const { io } = require('socket.io-client');
const survivor = io("ws://localhost:1963");
const chance = require('chance');
const Chance = new chance();


let survivorArr = [];
let deceasedArr = [];

// Blueprint for survivor object
class Survivor {
  constructor(name, profession, strength, agility, intelligence, health, status) {
    this.name = name;
    this.profession = profession;
    this.strength = strength;
    this.agility = agility;
    this.intelligence = intelligence;
    this.health = health;

    this.status = status;
  }
}

function generateSurvivors(n) {
  console.log("survivors generated");
  for (let i = 0; i < n; i++) { // generate n survivors.
    const survivor = new Survivor(
      this.name = Chance.name(),
      this.profession = Chance.profession(),
      this.strength = Chance.natural({ min: 1, max: 10 }),
      this.agility = Chance.natural({ min: 1, max: 10 }),
      this.intelligence = Chance.natural({ min: 1, max: 10 }),
      this.health = Chance.natural({ min: 1, max: 10 }),
      this.status = 'Alive',
    );
    survivorArr.push(survivor)
  }
};
console.log("----------->", survivorArr);

// survivor stat check. if all fail, take full damage. If all pass, all stats up one and health up 3. if some pass, no change to health, all stats up one.
async function skillCheck (catastrophe){
  survivorArr.forEach(survivor => {
    if (survivor.strength < catastrophe.strReq && survivor.agility < catastrophe.dexReq && survivor.intelligence < catastrophe.intReq){
        takesDamage(survivor, catastrophe);
    } else if(survivor.strength > catastrophe.strReq && survivor.agility > catastrophe.dexReq && survivor.intelligence > catastrophe.intReq){
        survivor.strength++;
        survivor.agility++;
        survivor.intelligence++;
        survivor.health = survivor.health + 3;
    }else {
        survivor.strength++;
        survivor.agility++;
        survivor.intelligence++;
    }
  })
  deceasedArr = survivorArr.filter(survivor=> survivor.status === "Dead");
  survivorArr = survivorArr.filter(survivor=> survivor.status === "Alive");
}

// Survivors takes damage. If health drops below zero, survivor dies. If health drops and survivor survives, survivor gains 1 to each stat.
 function takesDamage(survivor, catastrophe) {
   survivor.health = survivor.health - catastrophe.damage;
   if(survivor.health <= 0){
    survivor.status = 'Deceased';
   }
  }
// {
//   for (let i = 0; i < survivorArr.length; i++) {
//     survivorArr[i].health = survivorArr[i].health - damage;
//     if (survivorArr[i] <= 0) {
//       survivorArr.splice(i, 0);
//       console.log(`Survivor ${survivorArr[i].name} didn't survive`)
//     } else {
//       survivorArr[i].strength = survivorArr[i].strength + 1;
//       survivorArr[i].agililty = survivorArr[i].agililty + 1;
//       survivorArr[i].intelligence = survivorArr[i].intelligence + 1;
//     };
//   };
//   for(let i = 0; i < survivorArr.length; i++)
//   if(survivorArr[i].health <=0) {
//     survivorArr.splice(i, 1);
//   }
// };


// generate survivors
survivor.on('connect', () => {
  generateSurvivors(Chance.natural({ min: 5, max: 20}));
  survivor.emit("waitingOnFeedback", survivorArr, console.log('Survivors connected and waiting on CatCorp'));
});

survivor.on('modifiedDamageToSurvivors', (catastrophe) => {
  console.log('---> Survivors prior to skill check', survivorArr);
  skillCheck(catastrophe);
  console.log("-----> Skill Check conducted on survivor"),console.log("---> Survivor Array after skill check", survivorArr);

  survivor.emit('survivor status', survivorArr, deceasedArr);
});
// survivor.on('', (order) => {
//   survivor.emit('', (order));
// });
// survivor.on('', (order) => {
//   survivor.emit('', (order));
// });
// survivor.on('', (order) => {
//   survivor.emit('', (order));
// });

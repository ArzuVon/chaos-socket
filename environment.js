const { io } = require('socket.io-client');
const environment = io("ws://localhost:1963");
const Chance = require('chance');
const chance = new Chance();

// functions
// function environmentGenerator() {
//   console.log("Environment generated");
//   return {
//     env: {
//       type: chance.pickSet(['forest', 'mountain', 'desert', 'city']),
//       location: `${chance.coordinates()}`,
//     }
//   }
// }

// function environmentDamage(survivor, catastrophe, environment) {
//   // Wildfires
//   if (environment.type === 'forest' || 'mountains' && catastrophe.type === 'wildfire') {
//     survivor.health - 2;
//     survivor.strength - 1;
//     catastrophe.damage - 5;
//   }

//   if (environment.type === 'desert' || 'city' && catastrophe.type === 'Wildfire') {
//     survivor.health + 1;
//     catastrophe.damage - 3;
//   }

//   // Earthquakes
//   if (environment.type === 'mountains' || 'forest' && catastrophe.type === 'Earthquake') {
//     survivor.health - 1;
//     survivor.strength + 1;
//     catastrophe.damage - 5;
//   }

//   // Vampires
//   if (environment.type === 'desert' || 'mountains' && catastrophe.type === 'Vampire Outbreak') {
//     survivor.health + 1;
//     survivor.strength + 1;
//     catastrophe.damage - 3;
//   }

//   if (environment.type === 'forest' || 'city' && catastrophe.type === 'Vampire Outbreak') {
//     survivor.health - 1;
//     catastrophe.damage + 2;
//   }


//   // zombies
//   if (environment.type === 'city' || 'forest' && catastrophe.type === 'Zombie  Outbreak') {
//     survivor.health - 3;
//     survivor.strength - 2
//     catastrophe.damage - 1
//   }

//   if (environment.type === 'mountains' || 'desert' && catastrophe.type === 'Zombie  Outbreak') {
//     survivor.health + 1;
//     survivor.strength - 2
//     catastrophe.damage - 1
//   }

//   //tsunami
//   if (environment.type === 'city' || 'forest' && catastrophe.type === 'Tsunami') {
//     survivor.health - 3;
//     survivor.strength - 2
//     catastrophe.damage - 3
//   }

//   if (environment.type === 'mountains' || 'desert' && catastrophe.type === 'Tsunami') {
//     survivor.health + 1;
//     survivor.strength + 2
//     catastrophe.damage + 1
//   }
// }

// listeners/events
environment.on('catastrophe', (environment) => {
  environment.emit('Confrim', console.log('I heard ya!'));
  environment.join('Panic Room');
  //  let modifiedCatastrophe = environmentDamage(catastrophe)
  //   socket.emit('modified catastrophe', modifiedCatastrophe);
});


// socket.on('mountains', (order) => {
//   socket.emit('', (order));
// });


// socket.on('desert', (order) => {
//   socket.emit('', (order));
// });


// socket.on('city', (order) => {
//   socket.emit('', (order));
// });

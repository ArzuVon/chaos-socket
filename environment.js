const { io } = require('socket.io-client');
const socket = io("ws://localhost:1963");
const chance = require('chance');
const Chance = new chance();

//functions
function environmentGenerator() {
  console.log("Environment generated");
  return {
    env: {
      type: Chance.pickset(['forest', 'mountain', 'desert', 'city']),
      location: `${Chance.coordinates()}`,
    }
  }
}

function environmentDamage(catastrophe, environment) {
  // Wildfires
  if (environment.type === 'forest' || 'mountains' && catastrophe.type === 'wildfire') {
    catastrophe.damage = catastrophe.damage - 5;
  }

  if (environment.type === 'desert' || 'city' && catastrophe.type === 'Wildfire') {
    catastrophe.damage = catastrophe.damage - 3;
  }

  // Earthquakes
  if (environment.type === 'mountains' || 'forest' && catastrophe.type === 'Earthquake') {
    catastrophe.damage = catastrophe.damage - 5;
  }

  // Vampires
  if (environment.type === 'desert' || 'mountains' && catastrophe.type === 'Vampire Outbreak') {
    catastrophe.damage = catastrophe.damage - 3;
  }

  if (environment.type === 'forest' || 'city' && catastrophe.type === 'Vampire Outbreak') {
    catastrophe.damage = catastrophe.damage + 2;
  }


  // zombies
  if (environment.type === 'city' || 'forest' && catastrophe.type === 'Zombie  Outbreak') {
    catastrophe.damage = catastrophe.damage - 1;
  }

  if (environment.type === 'mountains' || 'desert' && catastrophe.type === 'Zombie Outbreak') {
    catastrophe.damage = catastrophe.damage - 1;
  }

  //tsunami
  if (environment.type === 'city' || 'forest' && catastrophe.type === 'Tsunami') {

    catastrophe.damage = catastrophe.damage- 3;
  }

  if (environment.type === 'mountains' || 'desert' && catastrophe.type === 'Tsunami') {
    catastrophe.damage = catastrophe.damage + 1;
  }
}

// listeners/events
socket.on('connect', () => {
  socket.emit('environmentConnected', console.log('Environment heard ya!'),
  // environment.join('Panic Room');
)});

socket.on('catastrophe', (catastrophe) => {
  console.log("-------> Pre env modfier catastrophe damage", catastrophe);
  let environment = environmentGenerator();
  console.log('environment:', environment);
  environmentDamage(catastrophe, environment);
  console.log("-------> post env modfier catastrophe damage",catastrophe.damage);
  socket.emit('envModifiesCatastrophe', catastrophe);
})

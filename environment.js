const IO = require('socket.io-client');
const socket = IO('');
const Chance = require('chance');
const chance = new Chance();

// functions

function environmentGenerator() {
    console.log("Environment generated");
    return {
        env:{
          type: chance.pickSet(['forest', 'mountain','dessert','city']),
          envID: chance.hash(),
          location: `${chance.coordinates()}`,
          timeSecured: new Date(),
          damage: 10,
        }
    }
}

function environmentDamage(survivor, catastrophe, environment){

    if(environment.type === 'forest' && catastrophe.type === 'wildfire'){
survivor.health - 2;
survivor.strength -1
environment.damage -5
}

    if(environment.type === 'mountains' && catastrophe.type === 'earthquake'){
    survivor.health - 1;
    survivor.strength + 1;
    environment.damage - 5;
}

    if(environment.type === 'dessert' && catastrophe.type === ){
    survivor.health + 1;
    survivor.strength + 1;
    environment.damage - 5;
}

    if(environment.type === 'city'){
    survivor.health - 2;
}
}

// listeners/events
socket.on('forest', (catastrophe)=>{
    environmentDamage(survivor)

    socket.emit('', (order));
});
socket.on('mountains', (order)=>{
    socket.emit('', (order));
});
socket.on('', (order)=>{
    socket.emit('', (order));
});
socket.on('', (order)=>{
    socket.emit('', (order));
});

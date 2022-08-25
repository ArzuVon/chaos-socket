const socketIo = require('socket.io');
const chance = require('chance');
const Chance = new chance();
const { throws } = require('assert');
const environment = require('./environment.js')
const catastropheCorp = socketIo(1963);

// Array contains survivor and environment module sockets
const allClients = [];

// Object blueprint for generating catastrophes
class Catastrophe {
    constructor(type, warning, strReq, dexReq, intReq, damage) {
        this.type = type;
        this.warning = warning;
        this.strReq = strReq;
        this.dexReq = dexReq;
        this.intReq = intReq;
        this.damage = damage;
    }
}

// Generates array of catastrophes using above class. Survival requirements are on a 1-10 scale
const catastropheList = [
    new Catastrophe('Tsunami', 'Tsunami iminent. Seek high ground immediately', 4, 6, 6, 8),
    new Catastrophe('Zombie Outbreak', 'Zombie virus active. Aim for the head.', 5, 6, 5, 7),
    new Catastrophe('Wildfire', 'Uncontrolled wildfire. Turn on radio for evacuation instructions.', 3, 5, 7, 8),
    new Catastrophe('Vampire Outbreak', 'Vampire threat active. Prepare garlic, stakes, and silver bullets. Invite no one into your house.', 4, 7, 7, 8),
    new Catastrophe('Earthquake', 'Earthquake in progress. Seek cover in strongest part of building.', 5, 5, 6, 7),
    new Catastrophe('Tornado', 'Tornado on the ground. Seek shelter immediately.', 2, 2, 5, 8),
];

// console.log(catastropheList);

function outgoingCatastrophe() {
    return Chance.pickset(catastropheList)
}
// const test = outgoingCatastrophe();
// console.log(test);

catastropheCorp.on('connection', (client) => {
    allClients.push(client);
    // client.join('Panic Room');
});

setInterval(() => {
    catastropheCorp.to('Panic Room').emit('catastrophe', () => {
        const catastrophe = outgoingCatastrophe();
        console.log('Catastrophe:', catastrophe);
        console.log('Warning:', catastrophe[0].warning);
    }), 8000
});



// client.on('', (order) => {
//     catastropheCorp.emit('', (order));
// });
// client.on('', (order) => {
//     catastropheCorp.emit('', (order));
// });
// client.on('', (order) => {
//     catastropheCorp.emit('', (order));
// });

// catastropheCorp.emit('catastrophe', () => {
//     const catastrophe = outgoingCatastrophe();
//     console.log('Catastrophe:', catastrophe);
//     console.log('Warning:', catastrophe[0].warning);
// });


module.exports = {

}

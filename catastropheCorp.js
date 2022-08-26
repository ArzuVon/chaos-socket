const socketIo = require('socket.io');
const chance = require('chance');
const Chance = new chance();
const { throws } = require('assert');
const catastropheCorp = socketIo(1963);

// Array contains survivor and environment module sockets
const allClients = [];
let currentCatastrophe = {};
// TODO: catastrophe ID / timestamp
let catastropheHistory = [];
let survivorArr=[];
let deceasedArr=[];
let catastropheCounter = 0;
// implement state for survivor stats here.


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

    client.on('waitingOnFeedback', () => {
        const catastrophe = outgoingCatastrophe();
        console.log('catastrophe:', catastrophe);
        currentCatastrophe = catastrophe[0];
        console.log('currentCatastrophe:', currentCatastrophe);
        console.log('Warning:', catastrophe[0].warning);
        console.log('Catastrophe:', catastrophe);
    });
    client.on('environmentConnected', () => {
        let catastrophe = currentCatastrophe;
        console.log('------>catastrophe and env connected', catastrophe);
        catastropheCorp.emit('catastrophe', catastrophe, console.log("------> CurrentCat Damage", catastrophe));
    });
    client.on('envModifiesCatastrophe', (catastrophe) => {
        catastropheHistory.push(catastrophe);
        // console.log('catastropheHistory:', catastropheHistory);
        catastropheCorp.emit("modifiedDamageToSurvivors", catastrophe);
    });
    client.on('survivor status', (survivorArr, deceasedArr) => {
        survivorArr = survivorArr;
        deceasedArr = deceasedArr;
        // console.log('final survivors:', survivorArr);
        // console.log('final losses', deceasedArr);
        // run until only one survivor
        while(catastropheCounter < 10){
            catastropheCounter++;
            catastropheHistory.push(currentCatastrophe);
            currentCatastrophe = outgoingCatastrophe();
            console.log('catastrophe history:', catastropheHistory.length);
            catastropheCorp.emit('catastrophe', currentCatastrophe[0]);
        }
        //if no survivors left, break.
        // else if(survivorArr.length=0){

        // }

    })
});

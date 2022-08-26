# Chaos Socket - Catastrophe Corp

## Team: Von Arzu, Derek Douglas, Jim Doyle, Justin Mathieu

## Description

Chaos Socket by Catastrophe Corp communicates and organizes all of your disaster information.

[UML](https://firebasestorage.googleapis.com/v0/b/remo-conference.appspot.com/o/Event%2FChatMedia%2Fh01n6z44pka%2FLab-14-UML.png?alt=media&token=108a70db-abc0-4b49-8987-ab05075e21ca)

![UML](https://firebasestorage.googleapis.com/v0/b/remo-conference.appspot.com/o/Event%2FChatMedia%2Fh01n6z44pka%2FLab-14-UML.png?alt=media&token=108a70db-abc0-4b49-8987-ab05075e21ca)

## Generating Catastrophes, Environment, and Survivors are key for server and clients

```
//Server/Hub Example
// Generates array of catastrophes using above class. Survival requirements are on a 1-10 scale

const catastropheList = [new Catastrophe('Tsunami', 'Tsunami iminent. Seek high ground immediately', 4, 6, 6, 8), new Catastrophe('Zombie Outbreak', 'Zombie virus active. Aim for the head', 5, 6, 5, 7), new Catastrophe('Wildfire', 'Uncontrolled wildfire. Turn on radio for evacuation instructions.', 3,5,7,8), new Catastrophe('Vampire Outbreak', 'Vampire threat active. Prepare garlic, stakes, and silver bullets. Invite no one into your house.', 4,7,7,8), new Catastrophe('Earthquake', 'Earthquake in progress. Seek cover in strongest part of building.', 5,5,6,7)];
```

```
// Client Example

function environmentGenerator() {
    console.log("Environment generated");
    return {
        env:{
            type: chance.pickSet(['forest', 'mountain','dessert','city']),
          envID: Chance.hash(),
          location: `${Chance.coordinates()}`,
          timeSecured: new Date(),
        }
    }
}
```

## Sources

## TODO from 8/25
- send catastrophe from catastrophe corp to environment
- in environment, alter the damage of the catastrophe if appropriate. Send back to catastrophe corp
- From catastrophe corp, emit the modified catastrophe to survivors.
- apply damage from modified catastrophe to survivors in survivor.js, with dead survivors being removed from survivor array.
- send the final array from survivor.js to catastrophe corp.

export function diceRoller(sides = 20, amount = 1, bonus = 0) {
  interface Roll {
    total: number;
    rolls: number[];
    critical?: boolean;
  }

  let roll: Roll = {
    total: bonus,
    rolls: [],
    critical: false
  };

  while (amount) {
    let newRoll: number = Math.ceil(Math.random() * sides);
    roll.rolls.push(newRoll);
    roll.total += newRoll;
    roll.critical = sides === 20 && newRoll === 20;
    amount--;
  }
  console.log(roll);
  return roll;
}

export function enumIntoArray(enumObject: any) {
  var returnArray = [];
  for (var key in enumObject) {
    returnArray.push(enumObject[key]);
  }
  return returnArray.slice(0, returnArray.length / 2);
}

export function calculateMod(statValue: number) {
  return Math.floor((statValue - 10) / 2);
}

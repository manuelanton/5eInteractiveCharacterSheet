import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { diceRoller } from "../utils";
import { removeAttack } from "../actions/attacks";
import NewAttack from "./NewAttack";

const Attacks = () => {
  const stats: any = useSelector<any>(state => state.stats);
  const level: any = useSelector<any>(state => state.level);
  const characterClass: any = useSelector<any>(state => state.class);
  const characterRace: any = useSelector<any>(state => state.race);
  const profBonus: any = useSelector<any>(state => state.profBonus);
  const attacks: any = useSelector<any>(state => state.attacks);
  const dispatch = useDispatch();

  interface Roll {
    total: number;
    rolls: number[];
    critical?: boolean;
  }
  const [result, setResult] = useState<Roll>({
    total: 0,
    rolls: [],
    critical: false
  });
  const critCalculator = () => {
    let extraDie = 0;
    if (characterClass === "Barbarian") {
      if (level >= 9) extraDie++;
      if (level >= 13) extraDie++;
      if (level >= 17) extraDie++;
    }
    if (characterRace === "Half-Orc") extraDie++;
    return extraDie;
  };
  const crit: any = critCalculator();

  return (
    <div style={{ margin: "1em", marginBottom: "0em" }}>
      <h4>Attacks</h4>
      {attacks.map((attack: { name: any; damage: any; stat: string }) => (
        <span key={attack.name} style={{ padding: "3px" }}>
          {attack.name} ({attack.stat}) ~ Damage: {attack.damage.diceAmount}D
          {attack.damage.diceSides} &nbsp;
          {attack.damage.damageType !== 7
            ? attack.damage.damageType
            : "Piercing"}
          &nbsp;
          <button
            onClick={() =>
              setResult(
                diceRoller(
                  20,
                  1,
                  Math.floor((stats[attack.stat] - 10) / 2) + profBonus
                )
              )
            }
          >
            roll attack
          </button>
          &nbsp;
          <button
            onClick={() =>
              setResult(
                diceRoller(
                  attack.damage.diceSides,
                  result.critical
                    ? attack.damage.diceAmount * 2 + crit
                    : attack.damage.diceAmount,
                  Math.floor((stats[attack.stat] - 10) / 2)
                )
              )
            }
          >
            roll damage
          </button>
          &nbsp;
          <button onClick={() => dispatch(removeAttack(attack.name))}>X</button>
          <br />
        </span>
      ))}
      <NewAttack />
      <br />
      {result.total > 0 && `Here's your result: ${result.total}!`}
      <br />
      {result.critical && "Critical hit!"}
      <br />
      {result.rolls.length > 1 &&
        `Here are your individual rolls: ${result.rolls}.`}
    </div>
  );
};

export default Attacks;

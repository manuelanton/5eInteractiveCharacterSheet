import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { diceRoller, calculateMod } from "../utils";
import { removeAttack } from "../actions/attacks";
import NewAttack from "./NewAttack";
import RollOne from "./RollOne";

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
    <div
      style={{ marginLeft: "1em", display: "flex", flexDirection: "column" }}
    >
      <h4>Attacks</h4>
      <div
        style={{
          overflowY: "scroll"
        }}
      >
        {attacks.map((attack: { name: any; damage: any; stat: string }) => (
          <div key={attack.name} style={{ padding: "3px" }}>
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
                    calculateMod(stats[attack.stat]) + profBonus
                  )
                )
              }
            >
              attack
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
                    attack.damage.damageMod && calculateMod(stats[attack.stat])
                  )
                )
              }
            >
              damage
            </button>
            &nbsp;
            <button onClick={() => dispatch(removeAttack(attack.name))}>
              X
            </button>
          </div>
        ))}
      </div>
      <NewAttack />
      <br />
      <div>
        {result.total > 0 && `Total: ${result.total}!`}
        {result.critical && " Critical hit!"}
        {result.rolls.length > 1 &&
          ` Individual rolls: ${result.rolls.join(", ")}`}
      </div>
      <br />
      <RollOne />
    </div>
  );
};

export default Attacks;

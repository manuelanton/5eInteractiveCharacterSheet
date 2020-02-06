import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enumIntoArray, diceRoller } from "../utils";
import { damageTypes } from "../reducers/index";
import { addAttack, removeAttack } from "../actions/attacks";

const Attacks = () => {
  const stats: any = useSelector<any>(state => state.stats);
  const level: any = useSelector<any>(state => state.level);
  const characterClass: any = useSelector<any>(state => state.class);
  const characterRace: any = useSelector<any>(state => state.race);
  const profBonus: any = useSelector<any>(state => state.profBonus);
  const attacks: any = useSelector<any>(state => state.attacks);
  const damageTypesArray = enumIntoArray(damageTypes);
  const dispatch = useDispatch();
  const possibleSides: number[] = [4, 6, 8, 10, 12, 20, 100];
  const [newAttackName, setNewAttackName] = useState<string>("");
  const [sides, setSides] = useState<number>(20);
  const [amount, setAmount] = useState<number>(1);
  const [damageType, setDamageType] = useState<string>("");
  const [newStat, setNewStat] = useState<string>("");
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
    if (characterClass == "Barbarian") {
      if (level >= 9) extraDie++;
      if (level >= 13) extraDie++;
      if (level >= 17) extraDie++;
    }
    if (characterRace == "Half-Orc") extraDie++;
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
      <br />
      <input
        type="text"
        defaultValue="attack name"
        name="name"
        onChange={e => setNewAttackName(e.currentTarget.value)}
      />
      &nbsp;
      <select
        name="stat"
        defaultValue=""
        onChange={e => setNewStat(e.currentTarget.value)}
      >
        <option value={""} disabled>
          choose one
        </option>
        <option value="STR">STR</option>
        <option value="DEX">DEX</option>
        <option value="CON">CON</option>
        <option value="INT">INT</option>
        <option value="WIS">WIS</option>
        <option value="CHA">CHA</option>
      </select>{" "}
      &nbsp;
      <select
        name="amount"
        onChange={e => setAmount(parseInt(e.currentTarget.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      D
      <select
        name="sides"
        defaultValue="4"
        onChange={e => setSides(parseInt(e.currentTarget.value))}
      >
        {possibleSides
          .filter(option => option < 13)
          .map(die => (
            <option value={die} key={die}>
              {die}
            </option>
          ))}
      </select>{" "}
      &nbsp;
      <select
        defaultValue=""
        onChange={e => setDamageType(e.currentTarget.value)}
      >
        <option value={""} disabled>
          choose one
        </option>
        {damageTypesArray.map(damageOption => (
          <option value={damageOption} key={damageOption}>
            {damageOption}
          </option>
        ))}
      </select>{" "}
      &nbsp;
      <button
        type="submit"
        onClick={() =>
          dispatch(addAttack(newAttackName, newStat, sides, amount, damageType))
        }
      >
        add new attack
      </button>
      <br />
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

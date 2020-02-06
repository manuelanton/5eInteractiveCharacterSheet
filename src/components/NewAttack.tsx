import React, { useState } from "react";
import { damageTypes } from "../reducers/index";
import { addAttack } from "../actions/attacks";
import { useDispatch } from "react-redux";
import { enumIntoArray } from "../utils";

const NewAttack = () => {
  const damageTypesArray = enumIntoArray(damageTypes);
  const dispatch = useDispatch();
  const possibleSides: number[] = [4, 6, 8, 10, 12, 20, 100];
  const [newAttackName, setNewAttackName] = useState<string>("");
  const [sides, setSides] = useState<number>(20);
  const [amount, setAmount] = useState<number>(1);
  const [damageType, setDamageType] = useState<string>("");
  const [newStat, setNewStat] = useState<string>("");
  return (
    <>
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
    </>
  );
};

export default NewAttack;

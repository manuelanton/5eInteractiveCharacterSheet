import React, { useState } from "react";
import { diceRoller } from "../utils";

interface Roll {
  total: number;
  rolls: number[];
  critical?: boolean;
}
const RollOne = () => {
  const [sides, setSides] = useState<number>(20);
  const [amount, setAmount] = useState<number>(1);
  const [bonus, setBonus] = useState<number>(0);
  const [result, setResult] = useState<Roll>({
    total: 0,
    rolls: [],
    critical: false
  });
  const [advantage, setAdvantage] = useState<boolean>(false);
  const [disadvantage, setDisadvantage] = useState<boolean>(false);
  const possibleSides: number[] = [4, 6, 8, 10, 12, 20, 100];

  const advantageHandler = (sides: number, amount: number, bonus: number) => {
    if (advantage && !disadvantage) {
      let firstRoll = diceRoller(sides, amount, bonus);
      let secondRoll = diceRoller(sides, amount, bonus);

      return firstRoll.total < secondRoll.total ? firstRoll : secondRoll;
    } else if (disadvantage && !advantage) {
      let firstRoll = diceRoller(sides, amount, bonus);
      let secondRoll = diceRoller(sides, amount, bonus);

      return firstRoll.total > secondRoll.total ? firstRoll : secondRoll;
    } else return diceRoller(sides, amount, bonus);
  };

  return (
    <>
      <h4>Misc. Rolls</h4>
      How many sides do your dice have? &nbsp;
      <select
        name="sides"
        defaultValue={sides}
        onChange={e => setSides(parseInt(e.currentTarget.value))}
      >
        {possibleSides.map(die => (
          <option value={die} key={die}>
            {die}
          </option>
        ))}
      </select>
      <br />
      {sides === 20 && (
        <div>
          Are we rolling with advantage &nbsp;
          <input
            type="checkbox"
            name="advantage"
            onChange={() => setDisadvantage(!disadvantage)}
          />{" "}
          disadvantage &nbsp;
          <input
            type="checkbox"
            name="disadvantage"
            onChange={() => setAdvantage(!advantage)}
          />
          ?
        </div>
      )}
      How many are we rolling? &nbsp;
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.currentTarget.valueAsNumber)}
      />
      <br />
      Are there any bonuses to the roll? &nbsp;
      <input
        type="number"
        value={bonus}
        onChange={e => setBonus(e.currentTarget.valueAsNumber)}
      />
      <br />
      <br />
      <button onClick={() => setResult(advantageHandler(sides, amount, bonus))}>
        Let's roll!
      </button>
      &nbsp; {result.total > 0 && `${result.total}! `}
      {result.critical && "Critical hit! "}
      {result.rolls.length > 1 && `Individual rolls: ${result.rolls}`}
    </>
  );
};

export default RollOne;

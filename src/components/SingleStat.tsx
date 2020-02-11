import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatCard, H5 } from "../components/styles/StatCard";
import { createStatChange, addSave, removeSave } from "../actions/stats";
import { diceRoller, calculateMod } from "../utils";

const SingleStat = (props: { name: string; stat: string }) => {
  const prof: any = useSelector<any>(state => state.saves);
  const statValue: any = useSelector<any>(state => state.stats[props.stat]);
  const profBonus: any = useSelector<any>(state => state.profBonus);
  const dispatch = useDispatch();

  const addOrRemoveSave = () => {
    return prof.includes(props.stat)
      ? removeSave(props.stat)
      : addSave(props.stat);
  };

  const saveBonus: number = prof.includes(props.stat)
    ? calculateMod(statValue) + profBonus
    : calculateMod(statValue);

  return (
    <StatCard>
      <input
        type="checkbox"
        checked={prof.includes(props.stat)}
        onChange={() => dispatch(addOrRemoveSave())}
      />
      <H5 onClick={() => alert(`Total: ${diceRoller(20, 1, saveBonus).total}`)}>
        {props.name.toUpperCase()}
      </H5>
      <span>
        {props.stat}: {calculateMod(statValue)}
      </span>

      <input
        type="number"
        style={{
          width: "75%",
          textAlign: "center",
          boxSizing: "border-box"
        }}
        value={statValue}
        onChange={e =>
          dispatch(createStatChange(props.stat, e.currentTarget.valueAsNumber))
        }
      />
    </StatCard>
  );
};

export default SingleStat;

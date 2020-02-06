import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatCard, H5 } from "../components/styles/StatCard";
import { createStatChange, addSave, removeSave } from "../actions/stats";

const SingleStat = (props: { name: string; stat: string }) => {
  const prof: any = useSelector<any>(state => state.saves);
  const statValue: any = useSelector<any>(state => state.stats[props.stat]);
  const dispatch = useDispatch();

  const addOrRemoveSave = () => {
    return prof.includes(props.stat)
      ? removeSave(props.stat)
      : addSave(props.stat);
  };

  return (
    <StatCard>
      <input
        type="checkbox"
        checked={prof.includes(props.stat)}
        onChange={() => dispatch(addOrRemoveSave())}
      />
      <H5>{props.name.toUpperCase()}</H5>
      <span>
        {props.stat}: {Math.floor((statValue - 10) / 2)}
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

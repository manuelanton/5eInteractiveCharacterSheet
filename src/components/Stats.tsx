import React, { useEffect } from "react";
import SingleStat from "../components/SingleStat";
import { useSelector, useDispatch } from "react-redux";
import { persistStore } from "../actions/persist";

const Stats = () => {
  const dispatch = useDispatch();
  const store: any = useSelector<any>(state => state);

  useEffect(() => {
    localStorage.store &&
      dispatch(persistStore(JSON.parse(localStorage.store)));
  }, []);

  useEffect(() => {
    if (store) {
      try {
        const stringStore = JSON.stringify(store);
        localStorage.setItem("store", stringStore);
      } catch (e) {
        console.log(e);
      }
    }
  }, [store]);

  return (
    <>
      <SingleStat name="Strength" stat="STR"></SingleStat>
      <SingleStat name="Dexterity" stat="DEX"></SingleStat>
      <SingleStat name="Constitution" stat="CON"></SingleStat>
      <SingleStat name="Intelligence" stat="INT"></SingleStat>
      <SingleStat name="Wisdom" stat="WIS"></SingleStat>
      <SingleStat name="Charisma" stat="CHA"></SingleStat>
    </>
  );
};

export default Stats;

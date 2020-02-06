import React from "react";
import SingleStat from "../components/SingleStat";

const Stats = () => {
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

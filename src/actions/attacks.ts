import { ADD_ATTACK, REMOVE_ATTACK } from "../constants";

export const addAttack = (
  name: string,
  stat: string,
  damageDie: number,
  dieAmount: number,
  damageType: string
) => ({
  type: ADD_ATTACK,
  payload: {
    name,
    stat,
    damage: {
      diceSides: damageDie,
      diceAmount: dieAmount,
      damageType
    }
  }
});

export const removeAttack = (name: string) => ({
  type: REMOVE_ATTACK,
  payload: name
});

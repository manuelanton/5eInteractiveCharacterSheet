import {
  CHANGE_NAME,
  CHANGE_BACKGROUND,
  CHANGE_CLASS,
  CHANGE_LEVEL,
  CHANGE_AC,
  CHANGE_HP_MAX,
  CHANGE_HP_CURRENT,
  CHANGE_RACE,
  RESET_ALL
} from "../constants";

export const resetAll = () => ({
  type: RESET_ALL
});

export const changeName = (name: string) => ({
  type: CHANGE_NAME,
  payload: name
});
export const changeRace = (race: string) => ({
  type: CHANGE_RACE,
  payload: race
});
export const changeBackground = (background: string) => ({
  type: CHANGE_BACKGROUND,
  payload: background
});
export const changeClass = (characterClass: string) => ({
  type: CHANGE_CLASS,
  payload: characterClass
});
export const changeLevel = (level: number) => ({
  type: CHANGE_LEVEL,
  payload: level
});
export const changeAC = (ac: number) => ({
  type: CHANGE_AC,
  payload: ac
});
export const changeHPMax = (newMax: number) => ({
  type: CHANGE_HP_MAX,
  payload: newMax
});
export const changeHPCurrent = (newCurrent: number) => ({
  type: CHANGE_HP_CURRENT,
  payload: newCurrent
});

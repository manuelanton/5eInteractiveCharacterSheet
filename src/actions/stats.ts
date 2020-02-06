import { CHANGE_MOD, ADD_SAVE, REMOVE_SAVE } from "../constants";

export const createStatChange = (stat: string, value: number) => ({
  type: CHANGE_MOD,
  payload: {
    stat,
    value
  }
});

export const addSave = (stat: string) => ({
  type: ADD_SAVE,
  payload: stat
});

export const removeSave = (stat: string) => ({
  type: REMOVE_SAVE,
  payload: stat
});

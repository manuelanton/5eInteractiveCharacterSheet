import { PERSIST_STORE } from "../constants";

export const persistStore = (state: any) => ({
  type: PERSIST_STORE,
  payload: state
});

import { Store, createStore } from "redux";
import { rootReducer, RootState } from "./reducers/index";

export function configureStore(initialState?: RootState): Store<RootState> {
  const store = createStore(
    rootReducer as any,
    initialState as any,

    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  ) as Store<RootState>;

  return store;
}

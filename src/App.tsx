import React from "react";
import { MainGrid } from "./components/styles/MainGrid";
import Stats from "./components/Stats";
import { Provider } from "react-redux";
import { configureStore } from "../src/store";
import CharacterDetail from "../src/components/CharacterDetail";
import Attacks from "./components/Attacks";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <MainGrid>
        <div
          style={{
            gridArea: "stats",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Stats />
        </div>
        <div style={{ gridArea: "details" }}>
          <CharacterDetail />
        </div>
        <div
          style={{
            gridArea: "attacks",
            maxHeight: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "3em"
          }}
        >
          <Attacks />
        </div>
      </MainGrid>
    </Provider>
  );
};

export default App;

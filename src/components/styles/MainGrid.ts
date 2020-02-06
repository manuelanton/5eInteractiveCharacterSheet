import styled from "styled-components";

export const MainGrid = styled.div`
  display: grid;
  margin: 0px;
  height: 100vh;
  max-heigth: 100vh;
  width: 100vw;
  grid-template-rows: 25% 1fr;
  grid-template-columns: 20% 1fr;
  grid-template-areas:
    "stats details"
    "stats attacks";
  box-sizing: border-box;
`;

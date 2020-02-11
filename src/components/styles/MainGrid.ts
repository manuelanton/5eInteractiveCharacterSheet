import styled from "styled-components";

export const MainGrid = styled.div`
  display: grid;
  margin: 0px;
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  grid-template-rows: 25% minmax(0, 1fr);
  grid-template-columns: 20% minmax(0, 1fr);
  grid-template-areas:
    "stats details"
    "stats attacks";
  box-sizing: border-box;
  background-color: #d6cca9;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: space-between;
    background-color: white;
  }
`;

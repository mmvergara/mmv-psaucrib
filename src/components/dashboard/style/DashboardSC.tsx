import styled from "styled-components";

export const DashboardIndexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  padding-top: 100px;
  justify-content: center;
  gap: 1em;
`;

export const DashboardCardContainer = styled.div`
  background-image: linear-gradient(to top left, #3d923d, #2b4829);
  border-radius: 10px;
  padding: 1em;
  min-width: 320px;
  min-height: 320px;
  max-width: 320px;
  max-height: 320px;
  filter: drop-shadow(1px 4px 4px #2f2f2f);
`;

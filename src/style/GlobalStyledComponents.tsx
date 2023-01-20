import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  width: 100%;
  background-color: ${(props:any)=>props.theme.mainBg};
  transition: all 1s ease;
}

`;

export default GlobalStyles;

import styled from "styled-components";

export const DivHomePageMainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-image: url("Psau.png");

  background-position: center;
`;

export const DivWelcomeTextContainerPsauHomePage = styled.div`
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("PSAULogo.png");
  background-position: center;
  background-size: 400px 400px;
  backdrop-filter: blur(5px);

  background-repeat: no-repeat;
  @media only screen and (max-width: 1200px) {
    display: none;
  }
`;
export const DivControlFeedBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  padding: 3px;
  width: 100%;
  font-weight: bold;
  gap: 5px;

  button {
    width: 50%;
    background-color: ${(props) => props.theme.postFeedControlButtons};
    font-weight: bold;
  }
  div {
    width: 50%;
  }
  div button {
    background-color: ${(props) => props.theme.postFeedControlButtons};
    width: 100%;
    font-weight: bold;
  }
`;
export const DivControlFeedContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;

  background-color: ${(props) => (props.theme.type === "darkmode" ? "#171717" : "white")};
  color: ${(props) => (props.theme.type === "darkmode" ? "white" : "#212529")};
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #9292927f;

  form {
    padding: 5px;
    width: 100%;
    border-radius: 7px;
    svg {
      margin-right: 5px;
    }
    input {
      padding-left: 1em;
      color: ${(props) => (props.theme.type === "darkmode" ? "white" : "#212529")};

      background-color: #c8c8c839;
      width: 97%;
      outline: none;
      border: none;
      border-radius: 8px;
      padding: 10px;
    }
  }
`;

export const DivAdminPanelContainer = styled.div`
  background-color: ${(props) => props.theme.adminPanel.panelBg};
  margin-inline: auto;
  max-width: 1200px;
  /* border-color: ${(props) => props.theme.adminPanel.panelBorder}; */
  /* border-style: solid; */
  /* border-width: 10px; */
  transition: all 1.5s;
  padding: 1em;
  border-radius: 15px;
`;

export const DivButtonWrapper = styled.button`
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5em 0em;
  margin: 0.3em 0em;
  font-family: "Poppins", sans-serif;
  background-color: #416d3e;
  outline: none;
  border: none;
  a {
    color: white;
    text-decoration: none;
  }
  svg {
    font-size: 2rem;
  }
`;

export const DivInputWrapper = styled.span`
  input {
    width: 100%;
    border: none;
    background-color: #d4e5d2;
    font-size: 1.2rem;
    outline: none;
    padding: 15px;
    margin-top: 0.75em;
    margin-bottom: 0.75em;
  }
  input:focus {
    outline-style: solid;
    outline-color: green;
    outline-width: 2px;
  }
  input::-webkit-input-placeholder {
    font-size: 1rem;
  }
`;

export const DivNavBarContainer = styled.div`
  position: fixed;
  z-index: 1000;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.navBg};
  color: rgb(241, 245, 220);
`;
export const UlNavTag = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  gap: 1em;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: 4px;

  @media only screen and (max-width: 520px) {
    display: none;
  }
`;
export const LiBurger = styled.li`
  color: rgb(241, 245, 220);
  font-size: 2rem;
  font-family: "Josefin Sans", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const DivMainNavLinks = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 2rem;
  margin: 0;
  font-family: "Poppins", sans-serif;
  margin: 2px;
  span {
    padding: 5px;
    font-size: 1.3rem;
    border-radius: 10px;
  }
  span:hover {
    background-color: #ffffff23;
    color: #ffb80e;
    transition: all 0.2s ease-out;
  }
  span svg {
    font-size: 2.3rem;
  }
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  span:last-child {
    display: none;
  }
  @media only screen and (max-width: 520px) {
    width: 100%;
    span div {
      display: none;
    }
    span:last-child {
      display: block;
    }
  }
`;

export const DivUserInfoNav = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.5rem;

  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
export const DivSideBar = styled.div`
  position: fixed;
  right: -300px;
  top: 51px;
  list-style-type: none;
  min-width: 289px;
  height: 100vh;
  background-color: ${(props) => props.theme.navBg};
  text-align: right;
  display: flex;
  align-items: left;
  flex-direction: column;
  border-bottom-left-radius: 10px;
  z-index: 100;
  gap: 0em;
`;
export const DivPSauCribText = styled.div`
  margin-right: auto;
  a {
    font-family: "Dancing Script", cursive;
    font-weight: bold;
    font-size: 2.5rem;
    color: rgb(241, 245, 220);
    text-decoration: none;
  }
  a:hover {
    color: #ffb80e;
  }
  @media only screen and (max-width: 880px) {
    display: none;
  }
`;
export const DivPSauCribTextClone = styled.div`
  margin-right: auto;
  a {
    font-family: "Dancing Script", cursive;
    font-weight: bold;
    font-size: 2.5rem;
    color: rgb(241, 245, 220);
    text-decoration: none;
  }
  a:hover {
    color: #ffb80e;
  }
`;

import styled from "styled-components";
export const DivGoogleButtonWrapper = styled.button`
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0.3em 0em;
  font-family: "Poppins", sans-serif;
  background-color: #34a853;
  outline: none;
  border: none;
  display: flex;
  padding: 2px;
  span {
    margin-top: 5px;
    height: 100%;
    color: white;
    text-decoration: none;
    flex-grow: 3;
    text-align: center;
  }
  svg {
    width: fit-content;
    font-size: 3rem;
    padding: 5px;
    background-color: white;
  }
`;
export const DivFacebookButtonWrapper = styled.button`
  width: 100%;
  text-align: center;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0.3em 0em;
  font-family: "Poppins", sans-serif;
  background-color: #1877f2;
  outline: none;
  border: none;
  display: flex;
  padding: 2px;
  span {
    margin-top: 5px;
    height: 100%;
    color: white;
    text-decoration: none;
    flex-grow: 3;
    text-align: center;
  }
  svg {
    width: fit-content;
    font-size: 3rem;
    padding: 5px;
    color: #1877f2;
    background-color: white;
  }
`;
export const LoginFormContainer = styled.div`
  background-color: ${(props) => props.theme.formContainer};
  padding: 1em;
  border-color: hsl(119, 88%, 14%);
  border-style: solid;
  border-width: 10px;
  transition: all 1.5s;
  width: 100%;
  max-width: 500px;
  form {
    width: 100%;
  }
`;
import styled from "styled-components";


export const RegisterFormContainer = styled.form`
  background-color: ${(props) => props.theme.formContainer};
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;
  max-width: 600px;
  padding: 1em;
  border-color: hsl(119, 88%, 14%);
  border-style: solid;
  border-width: 10px;
  transition: all 1.5s;

  b {
    color: ${(props) => props.theme.pfpInputLabel};
  }
`;


export const DivRegisterMainContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items:center;
`
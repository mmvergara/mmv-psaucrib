import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRef, useState } from "react";
import { pendingAccountsDetails } from "../../types/AppInterfaces";
import { AccountSliceActions } from "../../data/AccountSlice";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DivButtonWrapper, DivInputWrapper } from "../../style/StyledComponents";
import { ThemeProvider } from "styled-components";
import "./Login.css";
import AlternateLogin from "./AlternateLogin";
import { LoginFormContainer } from "./style/LoginStyledComponents";
import { firebaseURL } from "../../config";
const CryptoJS = require("crypto-js");

const Login: React.FC = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { formContainer } = useSelector((state: any) => state.uiSlice.theme);

  const inputStudentNumber = useRef<HTMLInputElement | null>(null!); //state
  const inputPass = useRef<HTMLInputElement | null>(null!); //state
  const dispatch = useDispatch();
  const [showErrorCredentials, setShowErrorCredentials] = useState(false);

  const confirmLogin = async (e: any) => {
    e.preventDefault();
    setShowErrorCredentials(false);
    const userStudentNumberInput = inputStudentNumber.current?.value!;
    const userPasswordInput = inputPass.current?.value!;
    const verificationData = await axios.get(firebaseURL + "/verifiedaccounts.json");
    const user: pendingAccountsDetails =
      verificationData.data[userStudentNumberInput.toLowerCase()];
    if (!user) {
      setShowErrorCredentials(true);
      return;
    }
    const decryptedUserPass = CryptoJS.AES.decrypt(user.userPass, "CrownKey").toString(
      CryptoJS.enc.Utf8
    );
    console.log("The password is", decryptedUserPass);
    if (decryptedUserPass !== userPasswordInput) {
      setShowErrorCredentials(true);
      return;
    }
    dispatch(
      AccountSliceActions.getUserCredentials({
        userCredential: user.userCredential,
        studentNumber: user.studentNumber,
        userName: user.userName,
        userPass: decryptedUserPass,
        userPic: user.userPic,
      })
    );
  };

  if (userCredential) {
    return <Navigate replace to='/psaufeed' />;
  }

  return (
    <ThemeProvider theme={{ formContainer: formContainer }}>
      <LoginFormContainer>
        <AlternateLogin />
        <hr style={{ borderTop: "3px solid #bbb" }} />
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
          }}
        >
          <DivInputWrapper>
            <input
              ref={inputStudentNumber}
              type='text'
              placeholder='Student Number ex. C202100921'
            />
          </DivInputWrapper>
          <DivInputWrapper>
            <input ref={inputPass} type='password' placeholder='Password' />
          </DivInputWrapper>
          {showErrorCredentials && <Alert variant='danger'>Wrong Credentials, Try Again!</Alert>}
          <DivButtonWrapper onClick={confirmLogin} type='submit'>
            Login
          </DivButtonWrapper>
        </Form>
        <Link to='/register'>
          <DivButtonWrapper>Create Account</DivButtonWrapper>
        </Link>
      </LoginFormContainer>
    </ThemeProvider>
  );
};

export default Login;

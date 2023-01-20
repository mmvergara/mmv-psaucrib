import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./Register.css";
import axios from "axios";
import { set as setFB, ref } from "firebase/database";
import { getDB } from "../../firebase/FirebaseDB";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { DivButtonWrapper, DivInputWrapper } from "../../style/StyledComponents";
import { useFormik } from "formik";
import { basicSchema } from "./FormSchema";
import { Alert } from "react-bootstrap";
import useLoading from "../../hooks/UseLoading";
import { ThemeProvider } from "styled-components";
import { DivRegisterMainContainer, RegisterFormContainer } from "./styles/RegisterSC";
const CryptoJS = require("crypto-js");
interface formValues {
  emailFormik: string;
  fullnameFormik: string;
  passwordFormik: string;
  studentnumberFormik: string;
  usernameFormik: string;
}
const Register: React.FC = () => {
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const { formContainer, pfpInputLabel } = useSelector((state: any) => state.uiSlice.theme);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImageSelfie, setSelectedImageSelfie] = useState<any>();
  const { LoadingCircle, startLoading, endLoading } = useLoading("Create Account");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const navigate = useNavigate();
  const { touched, errors, values, handleBlur, handleChange, handleSubmit } = useFormik<formValues>(
    {
      initialValues: {
        emailFormik: "",
        fullnameFormik: "",
        passwordFormik: "",
        studentnumberFormik: "",
        usernameFormik: "",
      },
      validationSchema: basicSchema,
      onSubmit: async (values, { resetForm }) => {
        setIsComplete(false);
        startLoading();
        let uploadImg;
        let uploadImgSelfie;

        if (selectedImage) {
          let formData = new FormData();
          formData.append("image", selectedImage);
          uploadImg = await axios.post(
            "https://api.imgbb.com/1/upload?key=47f97e3cdbc68c81f1f141c8042eb2e4",
            formData
          );
        }

        if (selectedImageSelfie) {
          let formData = new FormData();
          formData.append("image", selectedImageSelfie);
          uploadImgSelfie = await axios.post(
            "https://api.imgbb.com/1/upload?key=47f97e3cdbc68c81f1f141c8042eb2e4",
            formData
          );
        } else {
          endLoading();
          alert("Please add a Verification Image");
          return;
        }

        let encryptedPass = CryptoJS.AES.encrypt(values.passwordFormik, "CrownKey").toString();

        const data = {
          userCredential: "psauStudent",
          studentNumber: values.studentnumberFormik.toLowerCase(),
          userName: values.usernameFormik,
          userPass: encryptedPass,
          userEmail: values.emailFormik,
          userFullName: values.fullnameFormik,
          userPic: uploadImg?.data.data.image.url || "https://i.ibb.co/gtQqBc4/unnamed.jpg",
          userPicVerification:
            uploadImgSelfie?.data.data.image.url || "https://i.ibb.co/gtQqBc4/unnamed.jpg",
        };
        const fbReference = ref(getDB, "pendingaccounts/" + data.studentNumber);
        setFB(fbReference, data);
        setIsComplete(true);
        endLoading();
        setSelectedImage(null);
        setSelectedImageSelfie(null);
        resetForm();
      },
    }
  );

  const errorsGather = [
    touched.fullnameFormik && errors.fullnameFormik,
    touched.emailFormik && errors.emailFormik,
    touched.usernameFormik && errors.usernameFormik,
    touched.studentnumberFormik && errors.studentnumberFormik,
    touched.passwordFormik && errors.passwordFormik,
  ];

  const errorsList = errorsGather.filter((x) => {
    return typeof x === "string";
  });

  if (userCredential) {
    return <Navigate replace to='/psaufeed' />;
  }

  return (
    <ThemeProvider theme={{ formContainer, pfpInputLabel }}>
      <DivRegisterMainContainer>
        <RegisterFormContainer onSubmit={handleSubmit}>
          {isComplete && (
            <Alert key='success' variant='success'>
              Register Complete! <br /> We will notify you after we verify your registration
            </Alert>
          )}
          <DivInputWrapper>
            <input
              value={values.fullnameFormik}
              onChange={handleChange}
              onBlur={handleBlur}
              id='fullnameFormik'
              type='text'
              placeholder='Full Name'
            />
          </DivInputWrapper>
          <DivInputWrapper>
            <input
              value={values.emailFormik}
              onChange={handleChange}
              onBlur={handleBlur}
              type='email'
              id='emailFormik'
              placeholder='Email'
            />
          </DivInputWrapper>

          <div className='userstudentNum'>
            <DivInputWrapper className='userstudentNumInput'>
              <input
                value={values.usernameFormik}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                id='usernameFormik'
                placeholder='Display Name (username)'
              />
            </DivInputWrapper>
            <DivInputWrapper className='userstudentNumInput'>
              <input
                value={values.studentnumberFormik}
                onChange={handleChange}
                onBlur={handleBlur}
                type='text'
                id='studentnumberFormik'
                placeholder='Student #'
              />
            </DivInputWrapper>
          </div>

          <DivInputWrapper>
            <input
              value={values.passwordFormik}
              onChange={handleChange}
              onBlur={handleBlur}
              type='password'
              id='passwordFormik'
              placeholder='Password'
            />
          </DivInputWrapper>

          <Form.Group className='mb-3 pfpUpload'>
            <Form.Label>
              <b>Selfie with your Registration Form (Required)</b>
            </Form.Label>
            <Form.Control
              onChange={(event: any) => {
                setSelectedImageSelfie(event.target.files![0]);
              }}
              accept='image/png, img/jpg, img/jpeg'
              type='file'
            />
          </Form.Group>

          <Form.Group className='mb-3 pfpUpload'>
            <Form.Label>
              <b>Profile Picture (Optional)</b>
            </Form.Label>
            <Form.Control
              onChange={(event: any) => {
                setSelectedImage(event.target.files![0]);
              }}
              accept='image/png, img/jpg, img/jpeg'
              type='file'
            />
          </Form.Group>

          {errorsList.length !== 0 && (
            <Alert key='danger' variant='danger'>
              Form Errors Found: <br />
              {errorsList.map((x) => (
                <>
                  <span>{x}</span> <br />
                </>
              ))}
            </Alert>
          )}
          <DivButtonWrapper type='submit'>{LoadingCircle}</DivButtonWrapper>
          <DivButtonWrapper
            onClick={() => {
              navigate("/");
            }}
          >
            {"<-"} Sign In{" "}
          </DivButtonWrapper>
        </RegisterFormContainer>
      </DivRegisterMainContainer>
    </ThemeProvider>
  );
};

export default Register;

// Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext, 'CrownKey');

// var originalText = bytes.toString(CryptoJS.enc.Utf8);
// const bytes = CryptoJS.AES.decrypt("U2FsdGVkX1/CZDMU8x/VRgaSl8f+N2TP4W51lIeAbhg=", "CrownKey").toString(CryptoJS.enc.Utf8);
// console.log(bytes);
// console.log(originalText); // 'my message'

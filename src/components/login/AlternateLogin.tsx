import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AccountSliceActions } from "../../data/AccountSlice";
import "./AlternateLogin.css";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import firebase from "firebase/compat/app";
import { signInWithPopup, getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import { appFB } from "../../firebase/FirebaseActions";
import { DivFacebookButtonWrapper, DivGoogleButtonWrapper } from "./style/LoginStyledComponents";

const AlternateLogin: React.FC = () => {
  const dispatch = useDispatch();
  const { userCredential } = useSelector((state: any) => state.accountSlice.userInfo);
  const firebaseAuth = firebase.auth();

  const signInWithGoogle = () => {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(providerGoogle);
  };
  const signInWithFacebook = () => {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    signInWithPopup(getAuth(appFB), providerFacebook).then((x) => console.log(x));
  };

  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      const userPlatform = user.providerData[0]?.providerId.includes("facebook")
        ? "Facebook User"
        : "Google User";
      dispatch(
        AccountSliceActions.getUserCredentials({
          userCredential: userPlatform,
          studentNumber: userPlatform,
          userName: user.displayName!,
          userPass: "",
          userPic: user.photoURL!,
        })
      );
    }
  });

  if (userCredential !== "") {
    return <Navigate replace to='/psaufeed' />;
  }

  return (
    <>
      <div className='altLoginContainer'>
        <DivGoogleButtonWrapper
          onClick={() => {
            signInWithGoogle();
          }}
        >
          <FcGoogle />
          <span>Google Sign in</span>
        </DivGoogleButtonWrapper>
        <DivFacebookButtonWrapper
          onClick={() => {
            signInWithFacebook();
          }}
        >
          <BsFacebook />
          <span>Facebook Sign in</span>
        </DivFacebookButtonWrapper>
      </div>
    </>
  );
};

export default AlternateLogin;

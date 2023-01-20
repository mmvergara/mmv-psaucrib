import { useNavigate } from "react-router-dom";
import { AccountSliceActions } from "../data/AccountSlice";
import { useDispatch } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const LogoutPage: React.FC = () => {
  const urlNavigate = useNavigate();
  const dispatch = useDispatch();
  const firebaseAuth = firebase.auth();
  firebaseAuth.currentUser && firebaseAuth.signOut()
  dispatch(AccountSliceActions.SignOut());
  urlNavigate("/");

  return <></>;
};

export default LogoutPage;

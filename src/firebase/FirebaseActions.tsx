import { set, ref } from "firebase/database";
import { postsDetails, userInfo } from "../types/AppInterfaces";
import { getDatabase } from "firebase/database";
import { pendingAccountsDetails } from "../types/AppInterfaces";
import { getFirestore, collection } from "firebase/firestore";
import uniqid from "uniqid";
import firebase from "firebase/compat/app";
import axios from "axios";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseInitializeConfig, firebaseURL } from "../config";

export const appFB = firebase.initializeApp(firebaseInitializeConfig);
const firestoreDB = getFirestore(appFB);
export const messageFirestoreRef = collection(firestoreDB, "messages");

const getDB = getDatabase();

export const fetchPendingAccounts = async () => {
  let fetchedPAccounts: pendingAccountsDetails[] = [];
  const pAccountsData: { data: pendingAccountsDetails } = await axios.get(firebaseURL + "/pendingaccounts.json");
  if (pAccountsData.data === null) {
    return [];
  }

  for (const value of Object.values(pAccountsData.data)) {
    fetchedPAccounts.push(value);
  }
  return fetchedPAccounts;
};
export const deleteFromPending = async (studentNumber: string) => {
  const deleteResponseFromPending = await axios.delete(`${firebaseURL}/pendingaccounts/${studentNumber}.json`);
  return deleteResponseFromPending;
};

export const addAccountToDatabase = async (data: userInfo) => {
  const fbReference = ref(getDB, "verifiedaccounts/" + data.studentNumber);
  const setVerifyResponse = await set(fbReference, data);
  return setVerifyResponse;
};

export const addTDLDatabase = async (data: { text: string; studentNumber: string }) => {
  const fbReference = ref(getDB, "todolist/" + uniqid());
  const setVerifyResponse = await set(fbReference, data);
  return setVerifyResponse;
};
export const deleteTDLDatabase = async (todoId: string) => {
  const result = axios.delete(`${firebaseURL}/todolist/${todoId}.json`);
  return result;
};

export const fetchAllPosts = async () => {
  const postsData = await axios.get("${firebaseURL}/posts.json");
  let postAsList: postsDetails[] = [];
  let datas: any = postsData.data;
  if (datas) {
    for (const x of Object.values(datas)) {
      //@ts-ignore
      postAsList.push(x);
    }
  }
  return postAsList;
};

export const deletePostById = async (postID: string) => {
  const response = await axios.delete(`${firebaseURL}/posts/${postID}.json`);
  return response;
};

export const deleteCommentById = async (postID: string, commentID: string) => {
  const response = await axios.delete(`${firebaseURL}/posts/${postID}/postComments/${commentID}.json`);
  return response;
};

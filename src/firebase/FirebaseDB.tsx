import { getDatabase,} from "firebase/database";
import firebase from "firebase/compat/app";
import { firebaseInitializeConfig } from "../config";

export const appFB = firebase.initializeApp(firebaseInitializeConfig);

export const getDB = getDatabase();






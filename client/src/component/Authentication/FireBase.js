
import { initializeApp } from "firebase/app";
import { getStorage } from  "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPI,
  authDomain: process.env.REACT_APP_FIREBASEauthDomain,
  projectId: process.env.REACT_APP_FIREBASEprojectId,
  storageBucket: process.env.REACT_APP_FIREBASEstorageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASEmessagingSenderId,
  appId: process.env.REACT_APP_FIREBASEappId,
  measurementId:process.env.REACT_APP_FIREBASEmeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage= getStorage(app)

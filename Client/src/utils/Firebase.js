import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCMMPp306eQPPmk2-Q7zpzQrJI5Cd4ZeX0",
  authDomain: "jaamapp-5e50f.firebaseapp.com",
  projectId: "jaamapp-5e50f",
  storageBucket: "jaamapp-5e50f.appspot.com",
  messagingSenderId: "716073095582",
  appId: "1:716073095582:web:4580b80f6944b01d4a068f",
  measurementId: "G-9113VH5MXY"
};
const app = initializeApp(firebaseConfig);
export default app;

const db=getFirestore();
const auth=getAuth(app);
const GoogleProvider=new GoogleAuthProvider();


export{db,auth,GoogleProvider};
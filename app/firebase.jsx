import { initializeApp, getApps, getApp } from "firebase/app";
//import { getAuth } from "firebase/auth";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGlyDSfYWesaiM6lmr6zdwMy4OJXkafio",
  authDomain: "mw-project-react-2023.firebaseapp.com",
  projectId: "mw-project-react-2023",
  storageBucket: "mw-project-react-2023.appspot.com",
  messagingSenderId: 612970072949,
  appId: "1:612970072949:web:8e993f4d7b47cd63f8e13c",
  measurementId: "G-BVL850K5N2",
};
console.log(firebaseConfig);

let app; // Declare the variable before using it

// Check if Firebase is already initialized; if not, initialize it
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// init services
const db = getFirestore(app); // "db" name of the database to be use in app NOT name on firestore
//const projectAuth = getAuth(app);

// timestamp

export { db, Timestamp as timestamp };
//export { db, projectAuth, Timestamp as timestamp };

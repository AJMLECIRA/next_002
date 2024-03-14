import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const adminFirebaseConfig = {
  apiKey: 'AIzaSyCGlyDSfYWesaiM6lmr6zdwMy4OJXkafio',
  authDomain: 'mw-project-react-2023.firebaseapp.com',
  projectId: 'mw-project-react-2023',
  storageBucket: 'mw-project-react-2023.appspot.com',
  messagingSenderId: '612970072949',
  appId: '1:612970072949:web:8e993f4d7b47cd63f8e13c',
  measurementId: 'G-BVL850K5N2',
};

let adminApp; // Declare the variable before using it

// Check if Firebase is already initialized for the admin area; if not, initialize it
if (!getApp(adminApp)) {
  console.log('firebase first time initializing !!!');
  adminApp = initializeApp(adminFirebaseConfig);
} else {
  console.log('firebase already initialized !!!');
  adminApp = getApp(adminApp);
}

// Initialize Firebase services specific to the admin area
const adminFirestore = getFirestore(adminApp);

export { adminFirestore };

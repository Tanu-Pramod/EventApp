// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBIdzck14eQ3zh_nljVMgUj1Gy62L1cAc",
  authDomain: "event-management-3369f.firebaseapp.com",
  projectId: "event-management-3369f",
  storageBucket: "event-management-3369f.appspot.com",
  messagingSenderId: "1075475731907",
  appId: "1:1075475731907:web:650f39fb8ad63056159976",
  measurementId: "G-E79ZB06EQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey = process.env.REACT_APP_apiKey;
const authDomain = process.env.REACT_APP_authDomain;
const projectId = process.env.REACT_APP_projectId;
const storageBucket = process.env.REACT_APP_storageBucket;
const messagingSenderId = process.env.REACT_APP_messagingSenderId;
const appId = process.env.REACT_APP_appId;
const measurementId = process.env.REACT_APP_measurementId;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);

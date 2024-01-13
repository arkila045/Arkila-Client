import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOjSItRsl0QYsFj3ezQSUxFAcv_T3Ky60",
    authDomain: "arkila-408908.firebaseapp.com",
    projectId: "arkila-408908",
    storageBucket: "arkila-408908.appspot.com",
    messagingSenderId: "1031996574989",
    appId: "1:1031996574989:web:12e9174b239fd032a23444",
    measurementId: "G-LZJ1FR40L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

import { initializeApp } from "firebase/app";

/* Google Auth */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

/* thay config thành config của bạn */
const firebaseConfig = {
    apiKey: "AIzaSyD-uPQlOI3t-iF6wGyHYr4ML1KNRmEryB0",
    authDomain: "md5-project-ccd09.firebaseapp.com",
    projectId: "md5-project-ccd09",
    storageBucket: "md5-project-ccd09.appspot.com",
    messagingSenderId: "602291270127",
    appId: "1:602291270127:web:0eee2e5251207e557f461a",
    measurementId: "G-ZXGHVZ7D4P"
};
const app = initializeApp(firebaseConfig);

/* Google Auth Import */
const googleProvider = new GoogleAuthProvider();
export async function googleLogin() {
    let auth = getAuth(app);
    return await signInWithPopup(auth, googleProvider)
}
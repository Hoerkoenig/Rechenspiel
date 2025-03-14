// Importiere Firebase SDK (funktioniert nur mit npm)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB6GgLCR5o_SmHfR8cDcLGh-2vm4RJLUPA",
    authDomain: "flying-letters-ae11c.firebaseapp.com",
    projectId: "flying-letters-ae11c",
    storageBucket: "flying-letters-ae11c.appspot.com",
    messagingSenderId: "1062717840076",
    appId: "1:1062717840076:web:684e9bdb9cf0897f810069"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };

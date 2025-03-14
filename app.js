// Firebase-Initialisierung
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Firebase-Auth aus dem npm-Paket
import { getDatabase, ref, get } from 'firebase/database';  // Firebase-Datenbank
import { initializeApp } from 'firebase/app'; // Firebase initialisieren


// Firebase Konfiguration
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
const db = getDatabase(app);

// Authentifizierungsstatus überwachen
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Der Benutzer ist eingeloggt, leite ihn zum Dashboard weiter
        console.log('Benutzer ist eingeloggt:', user);
        window.location.href = 'dashboard.html';  // Weiterleiten zur Dashboard-Seite
    } else {
        // Der Benutzer ist nicht eingeloggt, leite ihn zur Login-Seite weiter
        console.log('Benutzer ist nicht eingeloggt');
        window.location.href = 'login.html';  // Weiterleiten zur Login-Seite
    }
});


// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyB6GgLCR5o_SmHfR8cDcLGh-2vm4RJLUPA",
    authDomain: "flying-letters-ae11c.firebaseapp.com",
    projectId: "flying-letters-ae11c",
    storageBucket: "flying-letters-ae11c.appspot.com",
    messagingSenderId: "1062717840076",
    appId: "1:1062717840076:web:684e9bdb9cf0897f810069"
};

// Initialisierung nur, falls noch keine Instanz läuft
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById("google-login").addEventListener("click", () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Eingeloggt als:", result.user.displayName);
            document.getElementById("auth-container").style.display = "none";
            document.getElementById("game-container").style.display = "block";
        })
        .catch((error) => {
            console.error("Login-Fehler:", error);
        });
});

// Prüfen, ob ein User eingeloggt ist
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("auth-container").style.display = "none";
        document.getElementById("game-container").style.display = "block";
    }
});

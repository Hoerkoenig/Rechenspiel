// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyB6GgLCR5o_SmHfR8cDcLGh-2vm4RJLUPA",
    authDomain: "flying-letters-ae11c.firebaseapp.com",
    projectId: "flying-letters-ae11c",
    storageBucket: "flying-letters-ae11c.appspot.com",
    messagingSenderId: "1062717840076",
    appId: "1:1062717840076:web:684e9bdb9cf0897f810069"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Login
document.getElementById('google-login').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('Google Login erfolgreich:', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => console.error('Google Login Fehler:', error));
});

// Facebook Login
document.getElementById('facebook-login').addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('Facebook Login erfolgreich:', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => console.error('Facebook Login Fehler:', error));
});

// E-Mail/Passwort Login
document.getElementById('email-login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(result => {
            console.log('E-Mail Login erfolgreich:', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => console.error('E-Mail Login Fehler:', error));
});

// Registrierung mit E-Mail
document.getElementById('email-signup').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            console.log('Registrierung erfolgreich:', result.user);
            window.location.href = 'dashboard.html';
        })
        .catch(error => console.error('Registrierungs-Fehler:', error));
});

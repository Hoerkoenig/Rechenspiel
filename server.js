import express from 'express';  // Express-Framework importieren
import path from 'path';        // Um den Pfad zu verwalten
import { fileURLToPath } from 'url';  // Um den Dateipfad des aktuellen Moduls zu ermitteln
import { initializeApp } from 'firebase/app';  // Firebase initialisieren
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Firebase Auth importieren

// Initialisierung von Express
const app = express();
const port = process.env.PORT || 3000;  // Der Port, auf dem der Server läuft

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
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Middleware, um statische Dateien zu bedienen (z. B. HTML, CSS, JS)
const __filename = fileURLToPath(import.meta.url); // Aktuellen Dateipfad ermitteln
const __dirname = path.dirname(__filename);  // Verzeichnis des aktuellen Moduls

// Statische Dateien (public Ordner) bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Diese Route zeigt die Login-Seite an, wenn der Benutzer nicht eingeloggt ist
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});



// Diese Route zeigt das Dashboard an, wenn der Benutzer eingeloggt ist
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Middleware für Firebase-Authentifizierung
app.get('/checkAuth', (req, res) => {
  const user = auth.currentUser;
  if (user) {
    // Wenn der Benutzer eingeloggt ist, weiterleiten zum Dashboard
    res.redirect('/dashboard');
  } else {
    // Wenn der Benutzer nicht eingeloggt ist, weiterleiten zum Login
    res.redirect('/login');
  }
});

// Firebase Auth-Status überwachen und den Benutzer weiterleiten
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Benutzer ist eingeloggt:', user);
  } else {
    console.log('Benutzer ist nicht eingeloggt');
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

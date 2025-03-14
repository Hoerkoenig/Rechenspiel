import express from 'express';  // Express-Framework importieren
import path from 'path';        // Um den Pfad zu verwalten
import { fileURLToPath } from 'url';  // Um den Dateipfad des aktuellen Moduls zu ermitteln
import admin from 'firebase-admin';  // Firebase Admin SDK importieren
import { initializeApp } from 'firebase/app';  // Firebase initialisieren
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Firebase Auth importieren

// Initialisierung von Express
const app = express();
const port = process.env.PORT || 3000;  // Der Port, auf dem der Server läuft

// Firebase Admin SDK initialisieren
admin.initializeApp(); // Firebase Admin initialisieren

// Firebase-Konfiguration für das Client-SDK
const firebaseConfig = {
  apiKey: "AIzaSyB6GgLCR5o_SmHfR8cDcLGh-2vm4RJLUPA",
  authDomain: "flying-letters-ae11c.firebaseapp.com",
  projectId: "flying-letters-ae11c",
  storageBucket: "flying-letters-ae11c.appspot.com",
  messagingSenderId: "1062717840076",
  appId: "1:1062717840076:web:684e9bdb9cf0897f810069"
};

// Firebase initialisieren (nur für Client)
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

// Middleware für Firebase-Authentifizierung (Überprüfung des Tokens)
app.get('/checkAuth', async (req, res) => {
  const idToken = req.headers['authorization']?.split('Bearer ')[1];  // Holen des Tokens aus den Headers
  
  if (!idToken) {
    return res.status(401).send('No token provided');
  }

  try {
    // Token überprüfen
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log('Benutzer-ID:', uid);
    res.status(200).send(`Benutzer ID: ${uid}`);
  } catch (error) {
    console.error('Fehler beim Überprüfen des Tokens:', error);
    res.status(401).send('Token ist ungültig');
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

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getAuth, verifyIdToken } from 'firebase-admin/auth';  // Firebase Admin SDK für serverseitige Authentifizierung
import * as admin from 'firebase-admin';

// Initialisierung von Express
const app = express();
const port = process.env.PORT || 3000;

// Firebase Admin SDK initialisieren
admin.initializeApp({
  credential: admin.credential.applicationDefault()  // Stelle sicher, dass du die Firebase Admin SDK-Konfiguration korrekt hinzufügst
});

// Firebase-Konfiguration (Client)
const firebaseConfig = {
  apiKey: "AIzaSyB6GgLCR5o_SmHfR8cDcLGh-2vm4RJLUPA",
  authDomain: "flying-letters-ae11c.firebaseapp.com",
  projectId: "flying-letters-ae11c",
  storageBucket: "flying-letters-ae11c.appspot.com",
  messagingSenderId: "1062717840076",
  appId: "1:1062717840076:web:684e9bdb9cf0897f810069"
};

// Firebase initialisieren (Client)
const appFirebase = initializeApp(firebaseConfig);

// Verwende den richtigen Dateipfad
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());  // Um JSON-Daten zu empfangen

// Route für die Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Route für das Dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Token-Überprüfung und Weiterleitung
app.post('/checkAuth', (req, res) => {
  const token = req.body.token;
  
  if (!token) {
    return res.status(400).send('Token erforderlich');
  }

  // Verifiziere das ID-Token mit Firebase Admin SDK
  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log('Benutzer verifiziert:', uid);
      res.status(200).send('Benutzer verifiziert');
    })
    .catch((error) => {
      console.error('Fehler bei der Token-Verifizierung:', error);
      res.status(401).send('Token ungültig');
    });
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

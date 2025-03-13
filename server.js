import express from 'express';
import { auth, db, ref, set, onValue, push, update } from './firebase-config.js';

const app = express();

// Verwende entweder die von Render bereitgestellte Umgebungsvariable PORT oder einen Standardport (falls lokal):
const PORT = process.env.PORT || 10000;

// Stelle sicher, dass Express JSON-Anfragen verarbeiten kann
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Beispiel-Route
app.get('/', (req, res) => {
  res.send('Willkommen beim Rechenspiel!');
});

// Starte den Server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

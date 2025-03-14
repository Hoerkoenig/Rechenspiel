import express from 'express';  // Verwende import statt require
import path from 'path';        // Verwende import statt require
import { fileURLToPath } from 'url'; // Benötigt, um den Dateipfad korrekt zu ermitteln in einem ES-Modul

const app = express();
const port = 3000;

// Um __dirname zu verwenden (für ES-Module):
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Route für login.html
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));  // Zeigt die login.html an
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

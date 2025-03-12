const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Static Files (z.B. HTML, CSS, JS)
app.use(express.static('public'));

// Beispiel-Route
app.get('/', (req, res) => {
  res.send('Willkommen zu meinem Projekt!');
});

// Beispiel-API-Route
app.get('/api/data', (req, res) => {
  res.json({ message: 'Dies ist eine API-Antwort.' });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});

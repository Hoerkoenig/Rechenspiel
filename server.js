const express = require('express');
const path = require('path');

const app = express();
const PORT = 10000;

// Statische Dateien aus dem aktuellen Verzeichnis bereitstellen
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

const express = require('express');
const app = express();

const port = process.env.PORT || 10000; // Hier wird entweder der von Render gesetzte PORT oder 3000 verwendet
const host = '0.0.0.0'; // Stelle sicher, dass der Server auf allen IPs hört

app.listen(port, host, () => {
  console.log(`Server läuft auf http://${host}:${port}`);
});

const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));  // Statische Dateien aus "public/" bereitstellen

// Login-Seite
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));


// app.js
import { auth, db, ref, set, onValue, push, update } from "./firebase-config.js";

let currentPlayerId = Math.random().toString(36).substring(7); // Eindeutige Spieler-ID
let currentPlayerName = "Spieler 1"; // Name des Spielers (später dynamisch setzen)



let zielzahl = 0; // Zielzahl für die aktuelle Runde
let rechenkette = []; // Aktuelle Rechenkette
let klickAnzahl = 0; // Anzahl der Klicks
let punkte = 0; // Aktuelle Punktzahl

// Funktion, um einen Spieler in die Warteschlange zu setzen
function joinQueue(playerId, playerName) {
    const queueRef = ref(db, "queue");
    push(queueRef, { playerId, playerName });
}

// Funktion, um auf einen Gegner zu warten
function waitForOpponent(playerId, callback) {
    const queueRef = ref(db, "queue");
    onValue(queueRef, (snapshot) => {
        const queue = snapshot.val();
        if (queue && Object.keys(queue).length >= 2) {
            const players = Object.values(queue);
            const opponent = players.find(player => player.playerId !== playerId);
            if (opponent) {
                callback(opponent);
            }
        }
    });
}

// Funktion, um das Spiel mit einem Gegner zu starten
function startGameWithOpponent(opponent) {
    const gameId = Math.random().toString(36).substring(7); // Eindeutige Spiel-ID
    const gameRef = ref(db, `games/${gameId}`);

    // Initialer Spielzustand
    set(gameRef, {
        player1: { id: currentPlayerId, name: currentPlayerName, rechenkette: [], punkte: 100 },
        player2: { id: opponent.playerId, name: opponent.playerName, rechenkette: [], punkte: 100 }
    });

    // Echtzeit-Synchronisation
    listenForOpponentMoves(gameId, (gameState) => {
        updateGameUI(gameState);
    });
}

// Funktion, um den Spielzustand zu synchronisieren
function syncGameState(gameId, playerId, rechenkette, punkte) {
    const gameRef = ref(db, `games/${gameId}`);
    update(gameRef, {
        [`player1/rechenkette`]: rechenkette,
        [`player1/punkte`]: punkte
    });
}

// Funktion, um die Aktionen des Gegners zu überwachen
function listenForOpponentMoves(gameId, callback) {
    const gameRef = ref(db, `games/${gameId}`);
    onValue(gameRef, (snapshot) => {
        const gameState = snapshot.val();
        if (gameState) {
            callback(gameState);
        }
    });
}

// app.js

// Globale Variablen
let currentPlayerId = Math.random().toString(36).substring(7); // Eindeutige Spieler-ID
let currentPlayerName = "Spieler 1"; // Name des Spielers (später dynamisch setzen)
let zielzahl = 0; // Zielzahl für die aktuelle Runde
let rechenkette = []; // Aktuelle Rechenkette
let klickAnzahl = 0; // Anzahl der Klicks
let punkte = 100; // Aktuelle Punktzahl

// Funktion zur Berechnung der Punkte
function calculatePunkte(rechenkette) {
    let punkte = 100; // Startpunkte
    let ergebnis = 0;
    let operator = "+";

    for (let op of rechenkette) {
        if (["+", "-", "*", "/"].includes(op)) {
            operator = op;
        } else if (op.startsWith("R")) {
            // Risikobuttons ignorieren wir für die Berechnung
            continue;
        } else {
            ergebnis = eval(`${ergebnis} ${operator} ${op}`);
            punkte += ergebnis; // Punkte der vorherigen Aufgaben hinzuaddieren
        }
    }

    return punkte;
}

// Funktion, die bei einem Button-Klick aufgerufen wird
function buttonClick(value) {
    rechenkette.push(value); // Wert zur Rechenkette hinzufügen
    klickAnzahl++; // Klickanzahl erhöhen
    punkte = calculatePunkte(rechenkette); // Punkte neu berechnen
    updateRechenkette(); // Rechenkette aktualisieren
    updatePunkte(); // Punkte anzeigen
}

// Funktion, um die Rechenkette in der UI anzuzeigen
function updateRechenkette() {
    const rechenketteDiv = document.getElementById("rechenkette");
    rechenketteDiv.innerHTML = rechenkette.map(op => `<div class="rechen-element">${op}</div>`).join('');
}

// Funktion, um die Punkte in der UI anzuzeigen
function updatePunkte() {
    const punkteElement = document.getElementById("punkte");
    punkteElement.textContent = `Punkte: ${punkte}`;
}

function buttonClick(value) {
    rechenkette.push(value);
    klickAnzahl++;
    punkte = calculatePunkte(rechenkette); // Punkte neu berechnen
    updateRechenkette();
    updatePunkte();
}

// Funktion, um das Spiel zu beenden
function endGame(gameId, playerId, playerName, punkte) {
    const highscoreRef = ref(db, "highscores");
    push(highscoreRef, { playerName, punkte });
    alert(`Spiel beendet! Deine Punkte: ${punkte}`);
}

// Starte ein Multiplayer-Spiel
function startMultiplayerGame() {
    joinQueue(currentPlayerId, currentPlayerName);
    waitForOpponent(currentPlayerId, (opponent) => {
        alert(`Gegner gefunden: ${opponent.playerName}`);
        startGameWithOpponent(opponent);
    });
}

// Event-Listener für den Multiplayer-Button
document.getElementById("multiplayerButton").addEventListener("click", startMultiplayerGame);


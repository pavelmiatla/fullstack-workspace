const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { log } = require("console");
const API_URL = "/api";
const PORT = 3000;
const GS_FILE = path.join(__dirname, "lucky_wheel_state.json");

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

function saveGameState(gs) {
  fs.writeFileSync(GS_FILE, JSON.stringify(gs, null, 2), "utf-8");
}

function readGameState() {
  if (!fs.existsSync(GS_FILE)) {
    saveGameState(initialGameState);
  }
  const data = fs.readFileSync(GS_FILE, "utf-8");
  const GameStateParsed = JSON.parse(data);
  return GameStateParsed;
}

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get(API_URL, (req, res) => {
  const gs = readGameState();
  res.json(gs);
});

const wheelSectors = [
  { value: "Blank", weight: 50 },
  { value: "100$", weight: 30 },
  { value: "1000$", weight: 20 },
];

function spinWheel() {
  const totalWeight = wheelSectors.reduce(
    (sum, sector) => sum + sector.weight,
    0,
  );
  let randomNumber = Math.random() * totalWeight;
  for (const sector of wheelSectors) {
    randomNumber -= sector.weight;
    if (randomNumber <= 0) {
      return sector.value;
    }
  }
}

app.post(`${API_URL}/spin`, (req, res) => {
  const gameState = readGameState();
  const spinResult = spinWheel();
  if (spinResult === "Blank") {
    gameState.losses++;
  } else {
    gameState.wins++;
  }
  gameState.lastResult = spinResult;
  saveGameState(gameState);
  res.json(gameState);
});

app.post(`${API_URL}/reset`, (req, res) => {
  const gameStateReseted = { ...initialGameState };
  saveGameState(gameStateReseted);
  res.json(gameStateReseted);
});

app.listen(3000, () => {
  console.log(`Server is running on port: ${PORT}`);
});

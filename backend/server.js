const express = require("express");
const cors = require("cors");
const repo = require("./repository");
const API_URL = "/api";
const PORT = 3000;

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

const app = express();
app.use(cors());

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

app.get(API_URL, async (req, res) => {
  const gs = await repo.readGameState();
  res.json(gs);
});

app.post(`${API_URL}/spin`, async (req, res) => {
  const gameState = await repo.readGameState();
  const spinResult = spinWheel();
  if (spinResult === "Blank") {
    gameState.losses++;
  } else {
    gameState.wins++;
  }
  gameState.lastResult = spinResult;
  await repo.saveGameState(gameState);
  res.json(gameState);
});

app.post(`${API_URL}/reset`, async (req, res) => {
  const gameStateReseted = await repo.resetGameState();
  res.json(gameStateReseted);
});

app.listen(3000, async () => {
  console.log(`Server is running on port: ${PORT}`);
  await repo.readGameState();
});

const fs = require("fs");
const path = require("path");

const GS_FILE = path.join(__dirname, "lucky_wheel_state.json");

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

async function readGameState() {
  console.log("repo readGameState is called");
  try {
    if (!fs.existsSync(GS_FILE)) {
      saveGameState(initialGameState);
    }
    const data = fs.readFileSync(GS_FILE, "utf-8");
    const GameStateParsed = JSON.parse(data);
    return GameStateParsed;
  } catch (error) {
    console.error("Cannot read a game state", error);
  }
}

async function saveGameState(gs) {
  console.log("repo saveGameState is called");

  try {
    fs.writeFileSync(GS_FILE, JSON.stringify(gs, null, 2), "utf-8");
  } catch (error) {
    console.log("Cannot save a game state", error);
  }
}

async function resetGameState() {
  console.log("repo resetGameState is called");

  const gameStateReseted = { ...initialGameState };
  try {
    fs.writeFileSync(
      GS_FILE,
      JSON.stringify(gameStateReseted, null, 2),
      "utf-8",
    );
    return gameStateReseted;
  } catch (error) {
    console.error("resetting game state failed", error);
  }
}

module.exports = {
  readGameState,
  saveGameState,
  resetGameState,
};

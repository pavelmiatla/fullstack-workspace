const fs = require("fs");
const path = require("path");
const mariaDB = require("mariadb");

require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});

const REPO_TYPE = process.env.DB_TYPE || "filesystem";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS;

let pool = mariaDB.createPool({
  host: "localhost",
  user: DB_USER,
  password: DB_PASS,
  database: "lucky_wheel_db",
  connectionLimit: 5,
});

const initialGameState = {
  wins: 0,
  losses: 0,
  lastResult: null,
};

async function readGameState() {
  console.log("MARIA DB repo readGameState is called");
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query(
      "SELECT wins, losses, last_result FROM game_state ORDER BY id DESC LIMIT 1",
    );

    if (rows.length === 1) {
      return {
        wins: rows[0].wins,
        losses: rows[0].losses,
        lastResult: rows[0].last_result,
      };
    } else {
      return initialGameState;
    }
  } catch (error) {
    console.error("Cannot read a game state", error);
    return initialGameState;
  } finally {
    if (connection) connection.end();
  }
}

async function saveGameState(gs) {
  console.log("MARIA DB repo saveGameState is called");
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO game_state (wins, losses, last_result) VALUES (?, ?, ?)",
      [gs.wins, gs.losses, gs.lastResult],
    );
  } catch (error) {
    console.error("Cannot save a game state", error);
  } finally {
    if (connection) connection.end();
  }
}

async function resetGameState() {
  console.log("MARIA DB repo resetGameState is called");
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query("TRUNCATE TABLE game_state");
    return initialGameState;
  } catch (error) {
    console.error("Cannot reset a game state", error);
    return initialGameState;
  } finally {
    if (connection) connection.end();
  }
}

module.exports = {
  readGameState,
  saveGameState,
  resetGameState,
};

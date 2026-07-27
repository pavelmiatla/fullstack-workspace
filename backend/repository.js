require("dotenv").config({
  path: require("path").resolve(__dirname, "..", ".env"),
});

const REPO_TYPE = process.env.DB_TYPE || "filesystem";

let repo;

if (REPO_TYPE === "mariaDB") {
  console.log("mariaDB is running");
  repo = require("./mariaDbRepository");
} else {
  console.log("filesystem  is running");
  repo = require("./filesystemRepository");
}

module.exports = repo;

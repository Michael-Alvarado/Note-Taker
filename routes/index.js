const express = require("express");
const notes = require("../lib/notes");

const app = express();

app.use("/notes", notes);

module.exports = app;
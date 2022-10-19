const express = require("express");
const routeToNotes = require("../lib/notes");

const app = express();

app.use("/notes", routeToNotes);

module.exports = app;
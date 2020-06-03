"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Pronto");
});
exports.default = app;
//# sourceMappingURL=App.js.map
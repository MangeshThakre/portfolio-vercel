const express = require("express");
const router = require("./router/router.js");
const path = require("path");
const mongoose = require("./database.js");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

// static image
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

//   API
app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/potfolio/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "potfolio", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("app is runing successfully");
  });
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

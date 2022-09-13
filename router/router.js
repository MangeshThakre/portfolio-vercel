const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/controller.js");
const path = require("path");
const fs = require("fs");

// insert
router.post("/insert_project", controller.insertProject);
// get
router.get("/fetchProject", controller.fetchProject);

router.post("/edit_project", controller.edit_project);
// middleware

module.exports = router;

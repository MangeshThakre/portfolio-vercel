const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controller/controller.js");
const path = require("path");
const fs = require("fs")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// insert
router.post(
  "/insert_project",
  upload.fields([
    {
      name: "categoryImg",
      maxCount: 1,
    },
    {
      name: "projectImg",
      maxCount: 1,
    },
  ]),

  controller.insertProject
);

// get

router.get("/fetchProject", controller.fetchProject);

router.post(
  "/edit_project",
  upload.fields([
    {
      name: "categoryImg",
      maxCount: 1,
    },
    {
      name: "projectImg",
      maxCount: 1,
    },
  ]),
  oldPicRemover,
  controller.edit_project
);

// middleware

// oldpic remover
function oldPicRemover(req, res, next) {
  function deleteoldpic(oldPic) {
    if (oldPic != "") {
      var oldPicname = oldPic.split("\\")[1];
      const testFolder = path.join(__dirname, "../uploads");
      fs.readdirSync(testFolder).forEach((file) => {
        if (oldPicname == file) fs.unlinkSync(testFolder + "/" + file);
      });
    }
  }

  if (req.body.projectImgRaw == "true" && req.query.oldprojectImg) {
    deleteoldpic(req.query.oldprojectImg);
  }
  if (req.body.categoryImgRaw == "true" && req.query.oldCatImg) {
    deleteoldpic(req.query.oldCatImg);
  }

  next();
}

module.exports = router;

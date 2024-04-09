const express = require("express");
const router = express.Router();
const schemeController = require("../controllers/schemeController");
const { authenticateAdmin, verifyAdminToken } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

// Define multer storage
// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// const uploadFile = multer({ dest: "uploads/" });
// Route to create a new scheme (only accessible to admin)
router.post(
  "/addSchemes",
  upload.single("imageURL"),
  verifyAdminToken,
  schemeController.createScheme
);

// Route to get all schemes (accessible to all users)
router.get("/getSchemes", schemeController.getAllSchemes);
router.put(
  "/editSchemes/:id",
  upload.single("imageURL"),
  verifyAdminToken,
  schemeController.editSchemes
);
router.delete("/deleteSchemes/:id", schemeController.deleteSchemes);

module.exports = router;

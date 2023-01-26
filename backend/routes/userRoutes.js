const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controlers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers).post(registerUser);
router.post("/login", authUser);

module.exports = router;

const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserById,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);

module.exports = router;

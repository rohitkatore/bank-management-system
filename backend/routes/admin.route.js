const express = require("express");
const { allBanks, searchBanks } = require("../controller/admin.controller");
const userAuth = require("../middlewares/auth.middleware");
const adminAuth = require("../middlewares/admin.middleware");
const router = express.Router();

// Apply both middlewares - first check authentication, then check admin role
router.get("/all", userAuth, adminAuth, allBanks);
router.get("/search", userAuth, adminAuth, searchBanks);

module.exports = router;
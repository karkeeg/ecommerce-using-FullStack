const express = require("express");
const { main, helloFunction } = require("../controller/testcontroller");
const router= express.Router();

router.get("/", main);
router.get("/hello", helloFunction);

module.exports = router 
const express = require("express");
const {body} = require("express-validator"); 
const { addBank, viewBank, viewSingleBank, editBank, removeBank } = require("../controller/bank.controller");
const userAuth = require("../middlewares/auth.middleware");
const { bankDetailsValidationRules } = require("../validators/bank.validation");
const router = express.Router();

router.post("/add",bankDetailsValidationRules,userAuth,addBank);

router.get("/view",userAuth,viewBank);

router.get("/view/:id",userAuth,viewSingleBank);

router.put("/edit/:id",bankDetailsValidationRules,userAuth,editBank);

router.delete("/delete/:id",userAuth,removeBank);

module.exports = router;
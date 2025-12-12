const express = require("express");
const router = express.Router();
const LoginControlador = require("../controladores/LoginControlador");

router.get("/login", (req, res) => {
    res.render("login"); 
});

router.post("/login", LoginControlador.Login);














module.exports = router
const express = require("express");
const router = express.Router();

const ControladorFichaClinica = require("../controladores/fichaClinica.js");
const { AutenticacaoCliente, AutenticacaoDentista } = require("../autenticacoes/autenticacoes.js");

router.post("/SalvarFichaClinica", AutenticacaoCliente, ControladorFichaClinica.SalvarFichaClinica);
router.post("/FichaClinicaCliente", AutenticacaoDentista, ControladorFichaClinica.FichaClinicaCliente);

module.exports = router;

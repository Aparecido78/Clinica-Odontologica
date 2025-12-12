const express = require("express");
const router = express.Router();

const ControladorPerfilDentista = require("../../controladores/Dentista/EditarPerfilDentista");
const {AutenticacaoDentista }= require("../../autenticacoes/autenticacoes.js")

router.get("/PerfilDentista", AutenticacaoDentista,ControladorPerfilDentista.PerfilDentista);
router.post("/EditarContatosDentista", AutenticacaoDentista,ControladorPerfilDentista.EditarContatosDentista);
router.post("/EditarInformacoesPessoaisDentista", AutenticacaoDentista,ControladorPerfilDentista.EditarInformacoesPessoaisDentista);
router.post("/EditarSenhaDentista", AutenticacaoDentista,ControladorPerfilDentista.EditarSenhaDentista);

module.exports = router;

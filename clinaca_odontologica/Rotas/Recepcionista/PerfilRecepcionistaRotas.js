const express = require("express");
const router = express.Router();

const ControladorPerfilRecepcionista = require("../../controladores/Recepcionista/EditarPerfilRecepcionista");
const {AutenticacaoRecepcionista }= require("../../autenticacoes/autenticacoes")

router.get("/PerfilRecepcionista", AutenticacaoRecepcionista,ControladorPerfilRecepcionista.PerfilRecepcionista);
router.post("/EditarContatosRecepcionista", AutenticacaoRecepcionista,ControladorPerfilRecepcionista.EditarContatosRecepcionista);
router.post("/EditarInformacoesPessoaisRecepcionista", AutenticacaoRecepcionista,ControladorPerfilRecepcionista.EditarInformacoesPessoaisRecepcionista);
router.post("/EditarSenhaRecepcionista", AutenticacaoRecepcionista,ControladorPerfilRecepcionista.EditarSenhaRecepcionista);


module.exports = router;

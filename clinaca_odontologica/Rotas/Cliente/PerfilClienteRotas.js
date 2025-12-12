const express = require("express");
const router = express.Router();

const ControladorPerfilCliente = require("../../controladores/Cliente/EditarPerfilCliente");
const {AutenticacaoCliente }= require("../../autenticacoes/autenticacoes.js")

router.get("/PerfilCliente",AutenticacaoCliente,ControladorPerfilCliente.PerfilCliente);
router.post("/EditarContatosCliente", AutenticacaoCliente,ControladorPerfilCliente.EditarContatosCliente);
router.post("/EditarInformacoesPessoaisCliente", AutenticacaoCliente,AutenticacaoCliente,ControladorPerfilCliente.EditarInformacoesPessoaisCliente);
router.post("/EditarSenhaCliente", AutenticacaoCliente,ControladorPerfilCliente.EditarSenhaCliente);

module.exports = router;

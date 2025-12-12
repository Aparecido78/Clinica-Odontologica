const express = require("express");
const router = express.Router();

const DentistaControlador = require("../../controladores/Dentista/DentistaControlador.js");

const {AutenticacaoDentista, AutenticacaoAdmin }= require("../../autenticacoes/autenticacoes.js")

router.get("/PaginaCadastroDentista", AutenticacaoAdmin,DentistaControlador.PaginaCadastroDentista);
router.get("/PaginaInicialDentista", AutenticacaoDentista,DentistaControlador.PaginaInicialDentista);
router.post("/RecomendacoesDentista", AutenticacaoDentista,DentistaControlador.RecomendacoesDentista);


router.get("/ListaDentista", AutenticacaoAdmin,DentistaControlador.ListaDentista);

router.post("/CadastroDentista", AutenticacaoAdmin,DentistaControlador.CadastroDentista);

module.exports = router;

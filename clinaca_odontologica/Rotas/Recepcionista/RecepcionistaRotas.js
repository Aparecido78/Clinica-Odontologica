const express = require("express")
const router = express.Router()
const RecepcionistaControlador = require("../../controladores/Recepcionista/RecepcionistaControlador.js")

const {AutenticacaoRecepcionista} = require("../../autenticacoes/autenticacoes")
const {AutenticacaoAdmin }= require("../../autenticacoes/autenticacoes.js")


router.get("/PaginaInicialRecepcionista", AutenticacaoRecepcionista,RecepcionistaControlador.PaginaInicialRecepcionista)
router.post("/FinalizarCadastroCliente",AutenticacaoRecepcionista,RecepcionistaControlador.FinalizarCadastroRecepcionista)

router.get("/TelaCadastroRecepcionista",AutenticacaoAdmin,RecepcionistaControlador.TelaCadastroRecepcionista)
router.post("/FinalizarCadastroRecepcionista",AutenticacaoAdmin,RecepcionistaControlador.FinalizarCadastroRecepcionista)
router.get("/ListaRecepcionista",AutenticacaoAdmin,RecepcionistaControlador.ListaRecepcionista)

module.exports = router












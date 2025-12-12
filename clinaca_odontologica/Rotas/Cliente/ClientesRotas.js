const express = require("express")
const router = express.Router()


const ClienteControlador = require("../../controladores/Cliente/ClientesControlador.js")
const Cliente = require("../../modelos/Cliente.js")


const {AutenticacaoCliente} = require("../../autenticacoes/autenticacoes.js")
const {AutenticacaoAdmin} = require("../../autenticacoes/autenticacoes.js")
const {AutenticacaoDentista,AutenticacaoRecepcionista }= require("../../autenticacoes/autenticacoes.js")


router.get("/PaginaLogin",AutenticacaoCliente,ClienteControlador.PaginaLogin)
router.post("/FinalizarCadastroCliente",ClienteControlador.FinalizarCadastroCliente)
router.get("/PaginaInicialUsuario", AutenticacaoCliente,ClienteControlador.PaginaInicialUsuario)


router.post("/CadastrarClienteRecepcionista",AutenticacaoRecepcionista,ClienteControlador.CadastrarClienteRecepcionista)
router.get("/PaginaCadastroCliente",ClienteControlador.PaginaCadastroCliente)


router.post("/PesquisarPaciente",AutenticacaoDentista,ClienteControlador.PesquisarPaciente)
router.get("/ListaCliente",AutenticacaoAdmin,ClienteControlador.ListaCliente)


module.exports = router






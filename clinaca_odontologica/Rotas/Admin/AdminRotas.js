const express = require("express")
const router = express.Router()
const AdminControlador = require("../../controladores/Admin/AdminControlador.js")

const {AutenticacaoAdmin }= require("../../autenticacoes/autenticacoes.js")


router.get("/PaginaInicialAdmin",AutenticacaoAdmin,AdminControlador.PaginaInicialAdmin)
router.post("/AdminRemoverRecepcionista",AutenticacaoAdmin,AdminControlador.AdminRemoverRecepcionista)
router.post("/AdminRemoverDentista",AutenticacaoAdmin,AdminControlador.AdminRemoverDentista)
router.post("/AdminRemoverCliente",AutenticacaoAdmin,AdminControlador.AdminRemoverCliente)

module.exports = router

 


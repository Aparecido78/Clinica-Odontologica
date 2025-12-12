const express = require("express")
const router = express.Router()

const ControladorPerfilAdmin = require("../../controladores/Admin/EditarPerfilAdmin")
const {AutenticacaoAdmin }= require("../../autenticacoes/autenticacoes.js")

router.get("/PerfilAdmin",AutenticacaoAdmin,ControladorPerfilAdmin.PerfilAdmin)
router.post("/EditarContatosAdmin",AutenticacaoAdmin,ControladorPerfilAdmin.EditarContatosAdmin)
router.post("/EditarInformacoesPessoaisAdmin",AutenticacaoAdmin,ControladorPerfilAdmin.EditarInformacoesPessoaisAdmin)
router.post("/EditarSenhaAdmin",AutenticacaoAdmin,ControladorPerfilAdmin.EditarSenhaAdmin)



module.exports = router

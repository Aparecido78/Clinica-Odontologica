const express = require("express")
const router = express.Router()
const upload = require("../upload/multer");

const ServicosControlador = require("../controladores/ServicosControlador")



const {AutenticacaoAdmin }= require("../autenticacoes/autenticacoes.js")

const authMiddleware = require("../autenticacoes/authMiddleware.js")

router.get("/TelaCadastrarServicos",AutenticacaoAdmin,ServicosControlador.TelaCadastrarServicos)

router.post("/CadastrarServico",AutenticacaoAdmin,upload.single("foto"),ServicosControlador.CadastrarServico)

router.get("/ListaServicos",ServicosControlador.ListaServicos)
  
router.post("/AtualizarServico/:id",AutenticacaoAdmin,upload.single("foto"),ServicosControlador.AtualizarServico)

router.get("/TelaEditarServicoAdmin/:id",AutenticacaoAdmin,ServicosControlador.TelaEditarServicoAdmin)

router.post("/AdminRemoverServico",AutenticacaoAdmin, ServicosControlador.AdminRemoverServico)

module.exports = router;
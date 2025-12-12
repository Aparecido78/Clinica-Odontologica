const express = require("express")
const router = express.Router()
const ControladorAgendamento = require("../controladores/Agendamento")


const {AutenticacaoCliente,AutenticacaoRecepcionista } = require("../autenticacoes/autenticacoes.js")



router.post("/TelaMarcarConsulta",AutenticacaoCliente,ControladorAgendamento.TelaMarcarConsulta)
router.post("/AgendamentoCliente",AutenticacaoCliente,ControladorAgendamento.AgendamentoCliente)
router.post("/AgendamentoRecepcionistaCliente",AutenticacaoRecepcionista,ControladorAgendamento.AgendamentoRecepcionistaCliente)

router.post("/PesquisarAgendamentoCliente",AutenticacaoRecepcionista, ControladorAgendamento.PesquisarAgendamentoCliente)



module.exports = router

const Dentista = require("../modelos/Dentista")
const Agendamento = require("../modelos/Agendamentos") 
const Servico = require("../modelos/Servicos")
const Cliente = require("../modelos/Cliente")
const FichaClinica = require("../modelos/FichaClinica")

module.exports={ 
async SalvarFichaClinica(req, res) {
    const ClienteId = req.session && req.session.cliente ? req.session.cliente.id : null;

    try {
        const {
            alergias,
            medicamentosUsoContinuo,
            doencasPreExistentes,
            historicoFamiliar,
            cirurgiasAnteriores,
            queixas,
            pressaoArterial,
            frequenciaCardiaca,
            peso,
            altura,
            higieneBucal,
            caries,
            gengivaInflamada,
            sensibilidadeDentes,
            restauracoes,
            dentesAusentes,
            proteses,
            bruxismo,
            tratamentoOrtodontico,
            habitos,
            exameOralGeral,
            radiografiasRecentes,
            observacoesExtras
        } = req.body;

        const fichaExistente = await FichaClinica.findOne({
            where: { ClienteId: ClienteId }
        });

        if (fichaExistente) {
            req.flash("error","Você já enviou a ficha clínica. Não é possível enviar novamente.");
            return res.redirect("/PaginaInicialUsuario");
        }

        await FichaClinica.create({
            ClienteId,
            alergias,
            medicamentosUsoContinuo,
            doencasPreExistentes,
            historicoFamiliar,
            cirurgiasAnteriores,
            queixas,
            pressaoArterial,
            frequenciaCardiaca,
            peso,
            altura,
            higieneBucal,
            caries,
            gengivaInflamada: gengivaInflamada ? true : false,
            sensibilidadeDentes,
            restauracoes,
            dentesAusentes,
            proteses,
            bruxismo: bruxismo ? true : false,
            tratamentoOrtodontico,
            habitos,
            exameOralGeral,
            radiografiasRecentes,
            observacoesExtras
        });

        req.flash("success", "Ficha Clínica cadastrada com sucesso!");
        res.redirect("/PaginaInicialUsuario");

    } catch (error) {
        console.error(error);
        req.flash("error", "Erro ao salvar ficha clínica.");
        res.redirect("/PaginaInicialUsuario");
    }
},


 async  FichaClinicaCliente(req, res) {
    const ClienteId = req.body.ClienteId;

    if (!ClienteId) {
        req.flash("error", "ID do cliente não enviado.");
        return res.redirect("/PaginaInicialDentista");
    }

    try {
       
        const cliente = await Cliente.findByPk(ClienteId);
        if (!cliente) {
            req.flash("error", "Cliente não encontrado.");
            return res.redirect("/PaginaInicialDentista");
        }

     
       const fichas = await FichaClinica.findAll({
    where: { ClienteId },
    include: [{ model: Cliente }] 
});

        const fichasPlain = fichas.map(f => f.get({ plain: true }));

        res.render("Dentista/paciente-pesquisado", {
            ClienteEncontrado: cliente.get({ plain: true }),
            FichaCliente: fichasPlain
        });

    } catch (err) {
        console.error("Erro ao pegar ficha clínica do cliente:", err);
        req.flash("error", "Erro ao pegar ficha clínica do cliente.");
        return res.redirect("/PaginaInicialDentista");
    }
}




}
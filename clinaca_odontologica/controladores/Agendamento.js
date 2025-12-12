const Agendamento = require("../modelos/Agendamentos");
const Cliente = require("../modelos/Cliente");
const Dentista = require("../modelos/Dentista");
const Servico = require("../modelos/Servicos");

const sendEmail = require("../utilitarios/email/nodemailer")

module.exports = {

    async TelaMarcarConsulta(req, res) {
        const { servicoId } = req.body;

        try {
            const dentistas = await Dentista.findAll();

            res.render("Consultas/fazer-agendamento", {
                servicoId,
                dentistas: dentistas.map(d => d.dataValues)
            });

        } catch (err) {
            console.log(err);
            res.redirect("/PaginaInicialUsuario");
        }
    },

    async AgendamentoCliente(req, res) {
        const { data, hora, motivo, servicoId, DentistumId } = req.body;
        const ClienteId = req.session.cliente?.id;

        if (!ClienteId) {
            req.flash("error", "Faça login para agendar");
            return res.redirect("/Login");
        }

        try {
            const ocupado = await Agendamento.findOne({
                where: { DentistumId, data, hora, ServicoId: servicoId }
            });

            if (ocupado) {
                req.flash("error", "Horário já está ocupado");
                return res.redirect("/PaginaInicialUsuario");
            }

            const limite = await Agendamento.count({ where: { ClienteId } });

            if (limite >= 3) {
                req.flash("error", "Limite máximo de 3 consultas atingido");
                return res.redirect("/PaginaInicialUsuario");
            }

            await Agendamento.create({
                DentistumId,
                ClienteId,
                data,
                hora,
                motivo,
                status: "agendado",
                ServicoId: servicoId
            });
           const cliente = await Cliente.findByPk(ClienteId);

    
        await sendEmail(
            cliente.email,
            "Consulta Agendada!",
            `<h2>Olá, ${cliente.nome}!</h2>
             <p>Sua consulta foi agendada com sucesso.</p>
             <p><strong>Data:</strong> ${data}</p>
             <p><strong>Hora:</strong> ${hora}</p>
             <p>Obrigado por usar nosso sistema! 😊</p>`
        );

            req.flash("success", "Consulta agendada!");
            return res.redirect("/PaginaInicialUsuario");

        } catch (err) {
            console.log(err);
            req.flash("error", "Erro ao agendar");
            return res.redirect("/PaginaInicialUsuario");
        }
    },


async AgendamentoRecepcionistaCliente(req, res) {
    const { cpf_cliente, DentistumId, ServicoId, data, hora, motivo } = req.body;

    try {
        
        if (!req.session.recepcionista) {
            req.flash("error", "Acesso negado!");
            return res.redirect("/LoginRecepcionista");
        }

       
        const cliente = await Cliente.findOne({ where: { cpf: cpf_cliente } });
        if (!cliente) {
            req.flash("error", "Cliente não encontrado pelo CPF informado.");
            return res.redirect("/PaginaInicialRecepcionista");
        }

        const ClienteId = cliente.id;

        const ocupado = await Agendamento.findOne({
            where: { DentistumId, data, hora, ServicoId }
        });
        if (ocupado) {
            req.flash("error", "Horário já ocupado para este dentista");
            return res.redirect("/PaginaInicialRecepcionista");
        }

        await Agendamento.create({
            ClienteId,
            DentistumId,
            ServicoId,
            data,
            hora,
            motivo,
            status: "agendado"
        });

        req.flash("success", "Agendamento criado com sucesso!");
        return res.redirect("/PaginaInicialRecepcionista");

    } catch (err) {
        console.log(err);
        req.flash("error", "Erro ao criar agendamento");
        return res.redirect("/PaginaInicialRecepcionista");
    }
},

async PesquisarAgendamentoCliente(req,res){
    const cpf  = req.body.cpf
    try{
        const ClienteEconterado = await Cliente.findOne({where:{cpf:cpf}})

        const agendamentosCliente = await Agendamento.findAll({

            where: { ClienteId: ClienteEconterado.id},
            include: [
                { model: Cliente },
                { model: Servico } 
            ]
        })
        
        res.render("Recepcionista/agendamento-cliente",{
            agendamentosCliente:agendamentosCliente,
            error: req.flash("error")[0],
            success: req.flash("success")[0]
        })

    }catch(err){  
        
        console.log(err);
        req.flash("error", "Erro ao pesquisar agendamentos");
        res.redirect("/PaginaInicialRecepcionista");

    }
}

}
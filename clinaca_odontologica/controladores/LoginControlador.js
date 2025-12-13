const bcrypt = require("bcryptjs")

const Recepcionista = require("../modelos/Recepcionista")
const Dentista = require("../modelos/Dentista")
const Admin = require("../modelos/Admin")
const Clientes = require("../modelos/Cliente")
const Servico = require("../modelos/Servicos")
const Agendamento = require("../modelos/Agendamentos")
const AnotacoesDentista = require("../modelos/AnotacoesDentista")

module.exports = {

    async Login(req, res) {
        const { nome, email, senha } = req.body
        try {
            const admin_existe = await Admin.findOne({ where: { email } })

            if (admin_existe) {

              

                if (senha == admin_existe.senha) {

                    req.session.admin = {
                        id: admin_existe.id,
                        nome: admin_existe.nome,
                        email: admin_existe.email
                    }

                    const quantidade_dentista = await Dentista.count()
                    const quantidade_recepcionista = await Recepcionista.count()
                    const quantidade_servicos = await Servico.count()
                    const quantidade_agendmento = await Agendamento.count({ where: { status: "agendado" } })
                    const quantidade_clientes = await Clientes.count()

                    req.flash("success", "admin logado com sucesso")
                    return res.render("Admin/pagina-inicial-admin", {
                        admin_logado: admin_existe.get({ plain: true }),
                        error: req.flash("error")[0],
                        success: req.flash("success")[0],
                        quantidade_dentista,
                        quantidade_recepcionista,
                        quantidade_clientes,
                        quantidade_agendmento,
                        quantidade_servicos
                    })
                } else {
                    req.flash("error", "senha incorreta")
                    return res.redirect("/Login")
                }
            }
            const Recepcionista_existe = await Recepcionista.findOne({ where: { email } })

            if (Recepcionista_existe) {

                const senhaCorreta = bcrypt.compareSync(senha, Recepcionista_existe.senha)

                if (senhaCorreta) {

                    req.session.recepcionista = {
                        id: Recepcionista_existe.id,
                        nome: Recepcionista_existe.nome,
                        email: Recepcionista_existe.email
                    }

                    const dentistas = await Dentista.findAll()
                    const servicos = await Servico.findAll()

                    req.flash("success", "Recepcionista logado com sucesso")

                    return res.render("Recepcionista/pagina-inicial-recepcionista", {
                        recepcionista_Logado: Recepcionista_existe.get({ plain: true }),
                        error: req.flash("error")[0],
                        success: req.flash("success")[0],
                        servicos,
                        dentistas
                    })

                } else {
                    req.flash("error", "senha incorreta")
                    return res.redirect("/Login")
                }
            }

        
            const Clientes_existe = await Clientes.findOne({ where: { email } })

            if (Clientes_existe) {

                const senha_correta_usuario = bcrypt.compareSync(senha, Clientes_existe.senha)

                if (senha_correta_usuario) {

                    req.session.cliente = {
                        id: Clientes_existe.id,
                        nome: Clientes_existe.nome,
                        email: Clientes_existe.email
                    }

                    const agendamentos = await Agendamento.findAll({
                        where: { ClienteId: Clientes_existe.id },
                        include: [{ model: Clientes }, { model: Servico }]
                    })

                    const servicos = await Servico.findAll()

                    const Recomendações = await AnotacoesDentista.findAll({
                        where: { ClienteId: Clientes_existe.id },
                        include: [{ model: Clientes }, { model: Dentista }]
                    })

                    req.flash("success", "Cliente logado com sucesso!")

                    return res.render("Cliente/pagina-inicial-cliente", {
                        clientes_Logado: Clientes_existe.get({ plain: true }),
                        servicos,
                        RecomendaçõesDentistaCliente: Recomendações,
                        agendamentos: agendamentos.map(a => a.toJSON()),
                        error: req.flash("error")[0],
                        success: req.flash("success")[0]
                    })

                } else {
                    req.flash("error", "senha incorreta")
                    return res.redirect("/Login")
                }
            }


            const Dentista_existe = await Dentista.findOne({ where: { email } })

            if (Dentista_existe) {

                const senhaCorreta = bcrypt.compareSync(senha, Dentista_existe.senha)

                if (senhaCorreta) {

                    req.session.dentista = {
                        id: Dentista_existe.id,
                        nome: Dentista_existe.nome,
                        email: Dentista_existe.email
                    }

                    const AgendaDentista = await Agendamento.findAll({
                        where: { DentistumId: Dentista_existe.id },
                        include: [{ model: Servico }, { model: Clientes }, { model: Dentista }],
                        order: [['data', 'ASC'], ['hora', 'ASC']]
                    })

                    const Recomendações = await AnotacoesDentista.findAll({
                        where: { DentistumId: Dentista_existe.id },
                        include: [{ model: Clientes }]
                    })

                    req.flash("success", "Dentista logado com sucesso!")

                    return res.render("Dentista/pagina-inicial-dentista", {
                        AgendaDentista: AgendaDentista.map(d => d.get({ plain: true })),
                        Dentista_nome: Dentista_existe.nome,
                        RecomendaçõesDentista: Recomendações.map(d => d.get({ plain: true })),
                        Dentista_Logado: Dentista_existe.get({ plain: true }),
                        error: req.flash("error")[0],
                        success: req.flash("success")[0]
                    })

                } else {
                    req.flash("error", "senha incorreta")
                    return res.redirect("/Login")
                }
            }

        } catch (err) {
            console.log("erro ao fazer login", err)
            req.flash("error", "erro ao fazer login")
            return res.redirect("/Login")
        }

    }

}

const Dentista = require("../../modelos/Dentista");
const bcrypt = require("bcryptjs");

module.exports = {


    async PerfilDentista(req, res) {
        const DentistaId = req.session.dentista.id;

        try {
            const DentistaEncontrado = await Dentista.findOne({
                where: { id: DentistaId }
            });

            res.render("Dentista/perfil-dentista", {
                DentistaEncontrado: DentistaEncontrado.get({plain:true})
            });

        } catch (erro) {
            console.log("Erro ao carregar perfil do dentista:", erro);
            res.redirect("/PaginaInicialDentista");
        }
    },

    async EditarContatosDentista(req, res) {
        const DentistaId = req.session.dentista.id;
        const { email, telefone } = req.body;

        try {
            await Dentista.update(
                { email, telefone },
                { where: { id: DentistaId } }
            );

            req.flash("success", "Contatos atualizados com sucesso!");
            res.redirect("/PerfilDentista");

        } catch (err) {
            console.log("Erro ao editar contatos do dentista:", err);
            req.flash("error", "Erro ao editar contatos");
            res.redirect("/PerfilDentista");
        }
    },

    async EditarInformacoesPessoaisDentista(req, res) {
        const DentistaId = req.session.dentista.id;
        const { sexo, data_nascimento, endereco, cpf, nome } = req.body;

        try {
            await Dentista.update(
                { sexo, data_nascimento, endereco, cpf, nome },
                { where: { id: DentistaId } }
            );

            req.flash("success", "Informações pessoais atualizadas!");
            res.redirect("/PerfilDentista");

        } catch (err) {
            console.log("Erro ao editar informações pessoais:", err);
            req.flash("error", "Erro ao editar informações pessoais");
            res.redirect("/PerfilDentista");
        }
    },

    async EditarSenhaDentista(req, res) {
        const DentistaId = req.session.dentista.id;
        const {  senha } = req.body;

        try {


            const sal = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, sal);

            await Dentista.update(
                { senha: hash },
                { where: { id: DentistaId } }
            );

            req.flash("success", "Senha alterada com sucesso!");
            res.redirect("/PerfilDentista");

        } catch (err) {
            console.log("Erro ao editar senha do dentista:", err);
            req.flash("error", "Erro ao alterar senha");
            res.redirect("/PerfilDentista");
        }
    }

};

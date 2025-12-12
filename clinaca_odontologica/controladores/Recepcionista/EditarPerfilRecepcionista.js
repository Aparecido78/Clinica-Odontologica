const Recepcionista = require("../../modelos/Recepcionista");
const bcrypt = require("bcryptjs");

module.exports = {

    async PerfilRecepcionista(req, res) {
        const RecepcionistaId = req.session.recepcionista.id;

        try {
            const RecepcionistaEncontrado = await Recepcionista.findOne({
                where: { id: RecepcionistaId }
            });

            res.render("Recepcionista/perfil-recepcionista", {
                Recepcionista: RecepcionistaEncontrado.get({plain:true})
            });

        } catch (erro) {
            console.log("Erro ao carregar perfil da recepcionista:", erro);
            res.redirect("/PaginaInicialRecepcionista");
        }
    },

    async EditarContatosRecepcionista(req, res) {
        const RecepcionistaId = req.session.recepcionista.id;
        const { email, telefone } = req.body;

        try {
            await Recepcionista.update(
                { email, telefone },
                { where: { id: RecepcionistaId } }
            );

            req.flash("success", "Contatos atualizados com sucesso!");
            res.redirect("/PerfilRecepcionista");

        } catch (err) {
            console.log("Erro ao editar contatos da recepcionista:", err);
            req.flash("error", "Erro ao editar contatos");
            res.redirect("/PerfilRecepcionista");
        }
    },

    async EditarInformacoesPessoaisRecepcionista(req, res) {
        const RecepcionistaId = req.session.recepcionista.id;
        const { sexo, data_nascimento, endereco, cpf, nome } = req.body;

        try {
            await Recepcionista.update(
                { sexo, data_nascimento, endereco, cpf, nome },
                { where: { id: RecepcionistaId } }
            );

            req.flash("success", "Informações pessoais atualizadas!");
            res.redirect("/PerfilRecepcionista");

        } catch (err) {
            console.log("Erro ao editar informações pessoais:", err);
            req.flash("error", "Erro ao editar informações pessoais");
            res.redirect("/PerfilRecepcionista");
        }
    },

    async EditarSenhaRecepcionista(req, res) {
        const RecepcionistaId = req.session.recepcionista.id;
        const { senha } = req.body;

        try {
            const sal = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, sal);

            await Recepcionista.update(
                { senha: hash },
                { where: { id: RecepcionistaId } }
            );

            req.flash("success", "Senha alterada com sucesso!");
            res.redirect("/PerfilRecepcionista");

        } catch (err) {
            console.log("Erro ao editar senha da recepcionista:", err);
            req.flash("error", "Erro ao alterar senha");
            res.redirect("/PerfilRecepcionista");
        }
    }

};

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
                 error: req.flash("error")[0],
                success: req.flash("success")[0],
                DentistaEncontrado: DentistaEncontrado.get({plain:true})
               
            });

        } catch (erro) {
          
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
          
            req.flash("error", "Erro ao editar informações pessoais");
            res.redirect("/PerfilDentista");
        }
    },
    
async EditarSenhaDentista(req, res) {
    const DentistaId = req.session.dentista.id;
    const { senhaAtual, novaSenha, confirmarNovaSenha } = req.body;

    
    if (novaSenha !== confirmarNovaSenha) {
        req.flash("error", "A nova senha e a confirmação não conferem!");
        return res.redirect("/PerfilDentista");
    }

    try {
        
        const dentista = await Dentista.findByPk(DentistaId);

        if (!dentista) {
            req.flash("error", "Dentista não encontrado!");
            return res.redirect("/PerfilDentista");
        }

        
        const senhaCorreta = await bcrypt.compare(senhaAtual, dentista.senha);
        if (!senhaCorreta) {
            req.flash("error", "Senha atual incorreta!");
            return res.redirect("/PerfilDentista");
        }

        
        const sal = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(novaSenha, sal);

        await Dentista.update(
            { senha: hash },
            { where: { id: DentistaId } }
        );

        req.flash("success", "Senha alterada com sucesso!");
        res.redirect("/PerfilDentista");

    } catch (err) {
        console.error(err);
        req.flash("error", "Erro ao alterar senha");
        res.redirect("/PerfilDentista");
    }
}


};

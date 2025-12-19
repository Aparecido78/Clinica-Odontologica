const Recepcionista = require("../../modelos/Recepcionista");
const bcrypt = require("bcryptjs");

module.exports = {
// Perfil Recepcionista
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
// Editar Contatos Do Recepcionista
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
// Editar Informações Do Recepcionista
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

// Editar senha do Recepcionista
    async EditarSenhaRecepcionista(req, res) {
    const RecepcionistaId = req.session.recepcionista.id;
    const { senhaAtual, novaSenha, confirmarNovaSenha } = req.body;

   
    if (novaSenha !== confirmarNovaSenha) {
      req.flash("error", "A nova senha e a confirmação não conferem!");
      return res.redirect("/PerfilRecepcionista");
    }

    try {
      
      const recepcionista = await Recepcionista.findByPk(RecepcionistaId);
      if (!recepcionista) {
        req.flash("error", "Recepcionista não encontrada!");
        return res.redirect("/PerfilRecepcionista");
      }

     
      const senhaCorreta = await bcrypt.compare(senhaAtual, recepcionista.senha);
      if (!senhaCorreta) {
        req.flash("error", "Senha atual incorreta!");
        return res.redirect("/PerfilRecepcionista");
      }

      
      const sal = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(novaSenha, sal);

  
      await Recepcionista.update(
        { senha: hash },
        { where: { id: RecepcionistaId } }
      );

      req.flash("success", "Senha alterada com sucesso!");
      res.redirect("/PerfilRecepcionista");

    } catch (err) {
      console.error("Erro ao editar senha da recepcionista:", err);
      req.flash("error", "Erro ao alterar senha");
      res.redirect("/PerfilRecepcionista");
    }
  }
};



const Cliente = require("../../modelos/Cliente")

const bcrypt = require("bcryptjs")

module.exports = {

    async PerfilCliente(req,res){
        const ClienteId = req.session.cliente.id
        try{
             const ClienteEncontrado = await Cliente.findByPk(ClienteId);

            if (!ClienteEncontrado) {
                console.log("Cliente não encontrado!");
                return res.redirect("/LoginCliente");
            }

            const cliente = ClienteEncontrado.get({ plain: true });
            res.render("Cliente/perfil-cliente",{
             ClienteEncontrado:cliente,
             error: req.flash("error")[0],
             success: req.flash("success")[0]
            })

        }catch(err){
           
            res.redirect("/PaginaInicialUsuario")
           
        }
    },

    async EditarContatosCliente(req,res){
        const ClienteId = req.session.cliente.id
        const email = req.body.email
        const telefone = req.body.telefone
        try{

            await Cliente.update(
                {telefone:telefone, email:email},
                {where:{id:ClienteId}},
            
        )
        req.flash("success","Contatos Editados com sucesso")
        res.redirect("/PaginaInicialUsuario")
       

        }catch(err){
             req.flash("error","Erro ao editar contatos")
          
             res.redirect("/PaginaInicialUsuario")
           
           
        }
    },

    async EditarInformacoesPessoaisCliente(req,res){
        const ClienteId = req.session.cliente.id
        const {sexo, data_nascimento, endereco, cpf,nome} = req.body
        try{
            await Cliente.update(
                {sexo,data_nascimento,endereco,cpf,nome},
                {where:{id:ClienteId}}


            )
            req.flash("success","Informações Editadas com sucesso")
            res.redirect("/PaginaInicialUsuario")


        }catch(err){

            req.flash("error","Erro ao editar informaçõesPessoais")
            res.redirect("/PaginaInicialUsuario")

         
    }
},

async  EditarSenhaCliente(req, res) {
    const ClienteId = req.session.cliente.id;
    const { senhaAtual, novaSenha, confirmarNovaSenha } = req.body;

    // Verifica se nova senha e confirmação conferem
    if (novaSenha !== confirmarNovaSenha) {
        req.flash("error", "A nova senha e a confirmação não conferem!");
        return res.redirect("/PaginaInicialUsuario");
    }

    try {
        // Busca o cliente no banco
        const cliente = await Cliente.findByPk(ClienteId);

        if (!cliente) {
            req.flash("error", "Cliente não encontrado!");
            return res.redirect("/PaginaInicialUsuario");
        }

        // Compara a senha atual informada com a do banco
        const senhaCorreta = await bcrypt.compare(senhaAtual, cliente.senha);
        if (!senhaCorreta) {
            req.flash("error", "Senha atual incorreta!");
            return res.redirect("/PaginaInicialUsuario");
        }

        // Se estiver correta, gera hash da nova senha e atualiza
        const sal = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(novaSenha, sal);

        await Cliente.update(
            { senha: hash },
            { where: { id: ClienteId } }
        );

        req.flash("success", "Senha editada com sucesso!");
        res.redirect("/PaginaInicialUsuario");

    } catch (err) {
        console.error(err);
        req.flash("error", "Erro ao editar senha!");
        res.redirect("/PaginaInicialUsuario");
    }
}

}


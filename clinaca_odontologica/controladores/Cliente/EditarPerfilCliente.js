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

async EditarSenhaCliente(req,res){
        const ClienteId = req.session.cliente.id
        const { senha }= req.body
        const sal = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(senha, sal)
        try{
            await Cliente.update(
                {senha:hash},
                {where:{id:ClienteId}}
                
            )         
            req.flash("success","Senha editada com sucesso")
            res.redirect("/PaginaInicialUsuario")
            
        }catch(err){


            req.flash("error","Erro ao editar senha",err)
            res.redirect("/PaginaInicialUsuario")
        }
    }

}


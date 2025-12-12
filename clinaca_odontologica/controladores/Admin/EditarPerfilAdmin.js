
const Admin = require("../../modelos/Admin")
const bcrypt = require("bcryptjs")

module.exports = {

    async PerfilAdmin(req,res){
        const AdminId = req.session.admin.id
        try{
            const AdminEncontrado = await Admin.findOne({where:{id:AdminId }})
            res.render("Admin/perfil-admin",{
             AdminEncontrado:AdminEncontrado.get({ plain: true }),
             error: req.flash("error")[0],
             success: req.flash("success")[0]
            })


        }catch(err){
            console.log("erro ao ir pro perfil admin")
            res.redirect("/PaginaInicialAdmin",err)
           
            
        }
    },

    async EditarContatosAdmin(req,res){
        const AdminId = req.session.admin.id
        const email = req.body.email
        const telefone = req.body.telefone
        try{

            await Admin.update(
                {telefone:telefone, email:email},
                {where:{id:AdminId}},
            
        )
        req.flash("success","Contatos Editados com sucesso")
        res.redirect("/PaginaInicialAdmin")

        }catch(err){

           
            console.log("Eroo ao editar contatos",err)
            req.flash("error","Erro ao editar contatos")
            res.redirect("/PaginaInicialAdmin")

        }
    },

    async EditarInformacoesPessoaisAdmin(req,res){
        const AdminId = req.session.admin.id
        const {sexo, data_nascimento, endereco, cpf,nome} = req.body
        try{
            await Admin.update(
                {sexo,data_nascimento,endereco,cpf,nome},
                {where:{id:AdminId}}
                

            )
            req.flash("success","Informações alteradas com sucesso")
            res.redirect("/PaginaInicialAdmin")


        }catch(err){

            req.flash("error","Erro ao editar informaçõesPessoais",err)
            res.redirect("/PaginaInicialAdmin")

         
    }
},

async EditarSenhaAdmin(req,res){
        const AdminId = req.session.admin.id
        const { senha} = req.body
       
        try{
            const sal = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha, sal)
            await Admin.update(
                {senha:hash},
                {where:{id:AdminId}}
                
            )  
            req.flash("success","Senha Alterada com sucesso")       
            res.redirect("/PaginaInicialAdmin")
            
        }catch(err){


            req.flash("error","Erro ao editar senha",err)
            res.redirect("/PaginaInicialAdmin")
        }
    }

}



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
async EditarSenhaAdmin(req, res) {
       
        if (!req.session.admin || !req.session.admin.id) {
            req.flash("error", "Sessão expirada. Faça login novamente.");
            return res.redirect("/LoginAdmin");
        }

        const AdminId = req.session.admin.id;
        const { senhaAtual, novaSenha, confirmarNovaSenha } = req.body;

       
        if (novaSenha !== confirmarNovaSenha) {
            req.flash("error", "A nova senha e a confirmação não conferem!");
            return res.redirect("/PerfilAdmin");
        }

        try {
          
            const admin = await Admin.findByPk(AdminId);
            if (!admin) {
                req.flash("error", "Admin não encontrado!");
                return res.redirect("/PerfilAdmin");
            }

           
            const senhaCorreta = await bcrypt.compare(senhaAtual, admin.senha);
            if (!senhaCorreta) {
                req.flash("error", "Senha atual incorreta!");
                return res.redirect("/PerfilAdmin");
            }

            
            const sal = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(novaSenha, sal);

          
            await admin.update({ senha: hash });

            req.flash("success", "Senha alterada com sucesso!");
            res.redirect("/PerfilAdmin");

        } catch (err) {
            console.error("Erro ao alterar senha do admin:", err);
            req.flash("error", "Erro ao alterar senha. Tente novamente.");
            res.redirect("/PerfilAdmin");
        }
    }
}
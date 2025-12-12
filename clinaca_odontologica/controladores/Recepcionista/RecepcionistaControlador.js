const bcrypt = require("bcryptjs")

const Recepcionista = require("../../modelos/Recepcionista")
const Clientes = require("../../modelos/Cliente")
const Servico = require("../../modelos/Servicos")
const dentista = require("../../modelos/Dentista")

module.exports = {
 async PaginaInicialRecepcionista(req,res){

        const servicosDB  = await Servico.findAll()
        const servicos = servicosDB.map(s => s.dataValues);
        const dentistas = dentista.findAll({row:true})
    res.render("Recepcionista/pagina-inicial-recepcionista",{
        dentistas:dentistas,
        servicos:servicos,
        error: req.flash("error")[0],
        success: req.flash("success")[0]

 })
},

async TelaCadastroRecepcionista(req,res){
    res.render("Admin/Recepcionista/cadastro-recepcionista",{
        error: req.flash("error")[0],
        success: req.flash("success")[0]
    })

},

async FinalizarCadastroRecepcionista(req,res) {

    const {nome, email, senha, telefone, cpf, endereco,data_nascimento,sexo} = req.body

    const sal = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(senha, sal)

    try{
        const email_existe = await Recepcionista.findOne({where:{email:email}})
        if(email_existe){
            console.log("email invalido, escolha outro email");
            req.flash("error","email invalido, escolha outro email")
            return res.redirect("/PaginaLogin")

        }
        await Recepcionista.create({nome, email, telefone, cpf, endereco,data_nascimento,sexo, senha:hash})
        
        console.log("Recepcionista cadastrado com sucesso")
        req.flash("success","Recepcionista cadastrado com sucesso")
        res.redirect("/PaginaInicialAdmin")
    }catch(err){

        console.log("erro ao fazer login",err)
        req.flash("erro","erro ao cadastrar Recepcionista")
        res.redirect("/PaginaInicialAdmin")
    }
},


async ListaRecepcionista(req,res){
     const ListaRecepcionista = await Recepcionista.findAll({ raw: true })
     res.render("Admin/Recepcionista/lista-recepcionista",{
        ListaRecepcionista:ListaRecepcionista
     })

},



}
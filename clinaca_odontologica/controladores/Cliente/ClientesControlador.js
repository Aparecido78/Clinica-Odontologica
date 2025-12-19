const { where } = require("sequelize");
const Clientes = require("../../modelos/Cliente")
const sendEmail = require("../../utilitarios/email/nodemailer")
const bcrypt = require("bcryptjs")
const FichaClinica = require("../../modelos/FichaClinica")
const Servico = require("../../modelos/Servicos")
const Agendamentos = require("../../modelos/Agendamentos");
const Dentista = require("../../modelos/Dentista");
const AnotacoesDentista = require("../../modelos/AnotacoesDentista")

module.exports = {
    
    async PaginaLogin(req,res){
    res.render("login",{
        error: req.flash("error")[0],
        success: req.flash("success")[0]
    })

},
async PaginaInicialUsuario(req,res){
     const ClienteId = req.session.cliente.id;
     try{
         const servicosDB  = await Servico.findAll()
    const servicos = servicosDB.map(s => s.dataValues);
    const agendamentos = await Agendamentos.findAll({
                where: { ClienteId },
                include: [Clientes, Servico]
            });

    const RecomendaçõesDentistaCliente = await AnotacoesDentista.findAll({
            where:{ClienteId:ClienteId},
            include:[{model:Clientes},{model:Dentista}]
        })

    const FichaClinicaCliente = await FichaClinica.findOne({
                         where: { ClienteId: ClienteId },
        })

    return res.render("Cliente/pagina-inicial-cliente",{
     FichaClinicaCliente: FichaClinicaCliente
            ? FichaClinicaCliente.get({ plain: true })
            : null,
    servicos:servicos,
    agendamentos:agendamentos,
    RecomendaçõesDentistaCliente: RecomendaçõesDentistaCliente,
    error: req.flash("error")[0],
    success: req.flash("success")[0]
    })

     }catch(err){
       
        res.redirect("/PaginaLogin")

     }
   
},



async PaginaCadastroCliente(req,res){
    res.render("Cliente/cadastro-cliente",{
        error: req.flash("error")[0],
        success: req.flash("success")[0]
    })
},

async FinalizarCadastroCliente(req,res) {

    const {nome, email, senha,telefone, cpf, endereco,data_nascimento,sexo} = req.body

    const sal = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(senha, sal)

    try{
        const email_existe = await Clientes.findOne({where:{email:email}})
        if(email_existe){
            console.log("email invalido, escolha outro email");
            req.flash("error","email invalido, escolha outro email")
            return res.redirect("/PaginaLogin")

        }
        await Clientes.create({nome, email, senha:hash,telefone, cpf, endereco,data_nascimento,sexo})
        await sendEmail(email, "Bem-vindo ao site!", `Olá ${nome}, seu cadastro foi concluído com sucesso!`);

        
      
        req.flash("success","Cliente cadastrado com sucesso")
        res.redirect("/PaginaLogin")
    }catch(err){


        req.flash("erro","erro ao cadastrar Cliente")
        res.redirect("/PaginaLogin")
    }
},

async PesquisarPaciente(req,res){
    const {nome} = req.body
    try{
        const ClienteEncontrado = await Clientes.findOne({where:{nome:nome}})
    
        

        res.render("Dentista/paciente-pesquisado",{
            ClienteEncontrado: ClienteEncontrado ? ClienteEncontrado.get({ plain: true }) : null,
            error: req.flash("error")[0],
            success: req.flash("success")[0]
           
        })
    }catch(err){
        res.redirect("/PaginaInicialDentista")
    }
},

async ListaCliente(req,res){
     const ListaCliente = await Clientes.findAll({ raw: true })
     res.render("Admin/Clientes/lista-clientes",{
        ListaCliente:ListaCliente,
        error: req.flash("error")[0],
        success: req.flash("success")[0]
     })

},

async CadastrarClienteRecepcionista(req,res){

    const {nome, email, senha,telefone, cpf, endereco,data_nascimento,sexo} = req.body

    const sal = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(senha, sal)

    try{
        const email_existe = await Clientes.findOne({where:{email:email}})
        if(email_existe){
           
            req.flash("error","email invalido, escolha outro email")
            return res.redirect("/PaginaLogin")

        }
        await Clientes.create({nome, email, senha:hash,telefone, cpf, endereco,data_nascimento,sexo})
        
       
        req.flash("success","Cliente cadastrado com sucesso")
        res.redirect("/PaginaInicialRecepcionista")
    }catch(err){

      
        req.flash("erro","Erro ao cadastrar Cliente")
        res.redirect("/PaginaInicialRecepcionista")
    }

},



}




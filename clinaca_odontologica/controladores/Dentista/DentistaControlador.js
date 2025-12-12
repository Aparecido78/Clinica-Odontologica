const bcrypt = require("bcryptjs")
const Dentista = require("../../modelos/Dentista")
const Agendamento = require("../../modelos/Agendamentos")
const Servico = require("../../modelos/Servicos")
const Cliente = require("../../modelos/Cliente")
const AnotacoesDentista = require("../../modelos/AnotacoesDentista")
const FichaClinica = require("../../modelos/FichaClinica")

module.exports ={
   async PaginaInicialDentista(req,res){
    const DentistumId = req.session.dentista.id


    const Dentista_Logado = await Dentista.findOne({where:{id:DentistumId}})

    const AgendaDentista = await Agendamento.findAll({
        where:{DentistumId:DentistumId},
        include:[{model:Servico},{model:Dentista}],order: [
        ['data', 'ASC'],  
        ['hora', 'ASC']   
    ]
    })
      const RecomendaçõesDentista = await AnotacoesDentista.findAll({
                        where:{DentistumId:DentistumId},
                        include:[{model:Cliente}]
                    })

    res.render("Dentista/pagina-inicial-dentista",{
        AgendaDentista: AgendaDentista.map(d => d.get({ plain: true })),
        Dentista_Logado:Dentista_Logado.get({plain: true}),
            RecomendaçõesDentista:RecomendaçõesDentista.map(d => d.get({ plain: true })),
            error: req.flash("error")[0],
            success: req.flash("success")[0]
    })
},


    async PaginaCadastroDentista(req,res){
        res.render("Admin/Dentista/cadastro-dentista",{
            error: req.flash("error")[0],
            success: req.flash("success")[0]
        })

},


async CadastroDentista(req,res){

    const {nome, email, senha,telefone, cpf, endereco,data_nascimento,sexo} = req.body

    const sal = bcrypt.genSaltSync(10)

    const hash = bcrypt.hashSync(senha, sal)

    try{
        const email_existe = await Dentista.findOne({where:{email:email}})
        if(email_existe){
            console.log("email invalido, escolha outro email");
            req.flash("error","email invalido, escolha outro email")
            return res.redirect("/PaginaInicialAdmin")

        }
        await Dentista.create({nome, email, senha:hash,telefone, cpf, endereco,data_nascimento,sexo})
        
        console.log(" cadastrado com sucesso")
        req.flash("success","Dentista cadastrado com sucesso")
        res.redirect("/PaginaInicialAdmin")
    }catch(err){

        console.log("erro ao fazer login",err)
        req.flash("erro","erro ao cadastrar Dentista")
        res.redirect("/PaginaCadastroDentista")
    }
},

async RecomendacoesDentista(req,res){
    const DentistumId = req.session.dentista.id
    const {exameFisico, diagnostico, tratamento, observacoes,FichaClinicaId,ClienteId} = req.body

    try{
       const AnotacoesDentistaExiste = await AnotacoesDentista.findAll({
            where: {
                FichaClinicaId,
                ClienteId,
                DentistumId
            }
        })


        if(AnotacoesDentistaExiste.length > 0){
            console.log("Erro, esse cliente ja possui uma anotação")
            req.flash("erro","Erro, esse cliente ja possui uma anotação")
            return res.redirect("/PaginaInicialDentista")

        }

        await AnotacoesDentista.create({
        exameFisico, diagnostico, tratamento,tratamento,
        observacoes, FichaClinicaId, ClienteId, DentistumId
    })

    console.log("Recomendações cadastradas com sucesso")
    req.flash("success","Recomendações cadastradas com sucesso")
    res.redirect("PaginaInicialDentista")


    }catch(err){
        console.log("Erro ao cadastrar recomendações pro cliente",err)
        req.flash("erro","Erro ao cadastrar recomendações pro cliente")
        res.redirect("PaginaInicialDentista")
    }

},

async MostrarRecomencacoesDentista(req,res){
    const DentistumId = req.session.dentista.id

    try{
        const RecomendaçõesDentista = await AnotacoesDentista.findAll({
            where:{DentistumId:DentistumId},
            include:[{model:Cliente}]
        })
        const servicosDB  = await Servico.findAll()
        const servicos = servicosDB.map(s => s.dataValues);       

        const AgendaDentista = await Agendamento.findAll({

            where:{DentistumId:Dentista_existe.id},
                include:[{model:Servico},{model:Cliente},{model:Dentista},                 
            ],order: [
            ['data', 'ASC'],  
            ['hora', 'ASC']   
            ]
            })
        
            res.render("/Dentista/paciente-pesquisado",{
            RecomendaçõesDentista:RecomendaçõesDentista,
            AgendaDentista:AgendaDentista,
            servicos:servicos
        })

    }catch(err){
        console.log("Erro ao enviar recomendações",err)
        req.flash("erro","Erro ao enviar recomendações")
        res.redirect("/PaginaInicialDentista")
    }

},

async ListaDentista(req,res){
     const ListaDentista = await Dentista.findAll({ raw: true })
     res.render("Admin/Dentista/lista-dentista-cadastrados",{
        ListaDentista:ListaDentista
     })

}
}



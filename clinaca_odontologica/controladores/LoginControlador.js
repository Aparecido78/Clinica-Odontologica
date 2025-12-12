const bcrypt = require("bcryptjs")

const Recepcionista = require("../modelos/Recepcionista")
const Dentista = require("../modelos/Dentista")
const Admin = require("../modelos/Admin")
const Clientes = require("../modelos/Cliente")
const Servico = require("../modelos/Servicos")
const Agendamento = require("../modelos/Agendamentos")
const AnotacoesDentista = require("../modelos/AnotacoesDentista")
const { where } = require("sequelize")


module.exports = {

    async Login(req,res){
    const {nome,email,senha } = req.body
    try{
      const admin_existe =   await Admin.findOne({where:{email:email}})
     
      if(admin_existe){
       
        const senhaCorretaAdmin = bcrypt.compareSync(senha, admin_existe.senha)
        if(senhaCorretaAdmin){
            console.log("admin logado com sucesso")
           

            req.session.admin ={
                id: admin_existe.id,
                nome: admin_existe.nome,
                email: admin_existe.email
            }
             const admin_Logado = await Admin.findOne({where:{id:admin_existe.id}})


                const quantidade_dentista = await Dentista.count()
                const quantidade_recepcionista = await Recepcionista.count()
                const quantidade_servicos = await Servico.count()
                const quantidade_agendmento = await Agendamento.count({where:{status:"agendado"}})
                const quantidade_clientes = await Clientes.count()
                console.log("SESSION CRIADA:", req.session.admin);
           req.flash("success","admin logado com sucesso")
           return  res.render("Admin/pagina-inicial-admin",{
                admin_logado:admin_Logado.get({plain: true}),
                 error: req.flash("error")[0],
                 success: req.flash("success")[0],
                 quantidade_dentista,
                 quantidade_recepcionista,
                 quantidade_clientes,
                 quantidade_agendmento,
                 quantidade_servicos
                 
            })
        }else{
            console.log("senha incorreta")
            req.flash("error","erro, senha incorreta")
          return  res.redirect("/Login")
        }
        }

      const Recepcionista_existe = await Recepcionista.findOne({where:{email:email}})

      if(Recepcionista_existe){

        const senha_Recepcionista_correta = bcrypt.compareSync(senha, Recepcionista_existe.senha)

        if(senha_Recepcionista_correta){
            console.log("Recepcionista logado com sucesso")
            req.flash("success","Recepcionista logado com sucesso")
            req.session.recepcionista = {
                id: Recepcionista_existe.id,
                nome: Recepcionista_existe.nome,
                email: Recepcionista_existe.email
            }
                const dentista = await Dentista.findAll()
              
                const servicos = await Servico.findAll()
             
                const recepcionista_Logado = await Recepcionista.findOne({where:{id:admin_existe.id}})
           
           return res.render("Recepcionista/pagina-inicial-recepcionista",{
               recepcionista_Logado:recepcionista_Logado.get({plain: true}),
                 error: req.flash("error")[0],
                 success: req.flash("success")[0],
                   servicos: servicos, 
                   dentistas: dentista
                
            })

        }else{

          console.log("erro ao logar Recepcionista")
          req.flash("error","erro ao logar Recepcionista")
           return  res.redirect("/Login")

        }
      }

      const Clientes_existe = await Clientes.findOne({where:{email:email}})
      if(Clientes_existe){
        const senha_correta_usuario = bcrypt.compareSync(senha, Clientes_existe.senha)
        if(senha_correta_usuario){
           

             req.session.cliente ={
                id: Clientes_existe.id,
                nome: Clientes_existe.nome,
                email: Clientes_existe.email
            } 
          
        const agendamentos = await Agendamento.findAll({
            where: { ClienteId: Clientes_existe.id },
            include: [
                { model: Clientes },
                { model: Servico },
            
            ]
        });
        const servicos = await Servico.findAll()
         const RecomendaçõesDentistaCliente = await AnotacoesDentista.findAll({
                    where:{ClienteId:Clientes_existe.id},
                    include:[{model:Clientes},{model:Dentista}]
                })
           const clientes_Logado = await Clientes.findOne({where:{id:admin_existe.id}})
       

           console.log("Cliente logado com sucesso")
           req.flash("success","Cliente logado com sucesso!")
           return res.render("Cliente/pagina-inicial-cliente",{
                clientes_Logado:clientes_Logado.get({plain: true}),
                servicos:servicos,
                RecomendaçõesDentistaCliente:RecomendaçõesDentistaCliente,
                agendamentos: agendamentos.map(a => a.toJSON()), 
                error: req.flash("error")[0],
                success: req.flash("success")[0],

            })

        }else{
            console.log("erro na senha")
            req.flash("error","senha incorreta")
            return res.redirect("/Login")
        }
      }

       
      const Dentista_existe = await Dentista.findOne({where:{email:email}})


      if(Dentista_existe){
        const senha_correta_dentista = bcrypt.compareSync(senha, Dentista_existe.senha)
        if(senha_correta_dentista){
            console.log("Dentista logado com sucesso")
            req.flash("success","Dentista logado com sucesso!")

             req.session.dentista = {
                id: Dentista_existe.id,
                nome: Dentista_existe.nome,
                email: Dentista_existe.email
            }
            
                const AgendaDentista = await Agendamento.findAll({
                    where:{DentistumId:Dentista_existe.id},
                    include:[{model:Servico},{model:Clientes},{model:Dentista},
                        
                    ],order: [
        ['data', 'ASC'],  
        ['hora', 'ASC']   
           ]
            })
            
             const RecomendaçõesDentista = await AnotacoesDentista.findAll({
                        where:{DentistumId:Dentista_existe.id},
                        include:[{model:Clientes}]
                    })
          

            const Dentista_Logado = await Dentista.findOne({where:{id:Dentista_existe.id}})

           return res.render("Dentista/pagina-inicial-dentista",{
                error: req.flash("error")[0],
                 success: req.flash("success")[0],
                  AgendaDentista: AgendaDentista.map(d => d.get({ plain: true })),
                    Dentista_nome:Dentista_existe.nome,
                    RecomendaçõesDentista:RecomendaçõesDentista.map(d => d.get({ plain: true })),
                    Dentista_Logado:Dentista_Logado.get({plain: true})
            })

        }else{
            console.log("erro na senha")
            req.flash("error","senha incorreta")
            return res.redirect("/Login")
        }
      }
      
    }catch(err){

        console.log("erro ao fazer login",err)
        req.flash("error","algum erro ao fazer login")
        return res.redirect("/Login")
    } 
    
},


}

















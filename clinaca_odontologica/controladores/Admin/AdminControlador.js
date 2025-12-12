const bcrypt = require("bcryptjs")
const Admin = require("../../modelos/Admin")

const Clientes = require("../../modelos/Cliente")
const Dentista = require("../../modelos/Dentista")
const Recepcionista = require("../../modelos/Recepcionista")
const Servico = require("../../modelos/Servicos")
const Agendamento = require("../../modelos/Agendamentos")

module.exports = {

    async PaginaInicialAdmin(req, res) {
       const quantidade_dentista = await Dentista.count()
       const quantidade_recepcionista = await Recepcionista.count()
       const quantidade_servicos = await Servico.count()
       const quantidade_agendmento = await Agendamento.count({where:{status:"agendado"}})
       const quantidade_clientes = await Clientes.count()

        res.render("Admin/pagina-inicial-admin", {
            error: req.flash("error")[0],
            success: req.flash("success")[0],
            quantidade_dentista,
            quantidade_recepcionista,
            quantidade_servicos,
            quantidade_agendmento,
            quantidade_clientes

        })
    },
async criarAdminPadrao() {
  try {
    const nome      = process.env.ADMIN_DEFAULT_NOME;
    const email     = process.env.ADMIN_DEFAULT_EMAIL;
    const senha     = process.env.ADMIN_DEFAULT_PASSWORD;
    const foto      = process.env.ADMIN_DEFAULT_FOTO === "null" ? null : process.env.ADMIN_DEFAULT_FOTO;
    const cpf       = process.env.ADMIN_DEFAULT_CPF;
    const telefone  = process.env.ADMIN_DEFAULT_TELEFONE;
    const endereco  = process.env.ADMIN_DEFAULT_ENDERECO;
    const nascimento= process.env.ADMIN_DEFAULT_NASCIMENTO;
    const sexo      = process.env.ADMIN_DEFAULT_SEXO;
 
    const existe = await Admin.findOne({ where: { email } });

    if (!existe) {
      const sal = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(senha, sal);

      await Admin.create({
        nome,
        email,
        senha: hash,
        foto,
        cpf,
        telefone,
        endereco,
        data_nascimento: nascimento,
        sexo
      });

      console.log("Admin criado com sucesso!");
    } else {
      console.log("Admin padrão já existe.");
    }

  } catch (err) {
    console.log("Erro ao criar admin:", err);
  }
},

async AdminRemoverRecepcionista(req,res){
  try{
    const RecepcionistaId = req.body.RecepcionistaId
    await Recepcionista.destroy({where:{id:RecepcionistaId}})
    console.log("Recepcionista Removido com sucesso")
    req.flash("success","Recepcionista Removido com sucesso")
    res.redirect("/PaginaInicialAdmin")


  }catch(err){
    console.log("Erro ao Remover Recepcionista",err)
    req.flash("error","Erro ao Remover Recepcionista")
    res.redirect("/PaginaInicialAdmin")

  }

},

async AdminRemoverDentista(req,res){
  try{
    const DentistaId = req.body.DentistaId
     await Dentista.destroy({where:{id:DentistaId}})
    console.log("Dentista Removido com sucesso")
    req.flash("success","Dentista Removido com sucesso")
    res.redirect("/PaginaInicialAdmin")


  }catch(err){
    console.log("Erro ao Remover Dentista",err)
    req.flash("error","Erro ao Remover Dentista")
    res.redirect("/PaginaInicialAdmin")


  }
},
  
  async AdminRemoverCliente(req,res){
    const ClienteId = req.body.ClienteId

  try{
     await Clientes.destroy({where:{id:ClienteId}})
    console.log("ClienteId Removido com sucesso")
    req.flash("success","ClienteId Removido com sucesso")
    res.redirect("/PaginaInicialAdmin")


  }catch(err){
    console.log("Erro ao Remover ClienteId",err)
    req.flash("error","Erro ao Remover ClienteId")
    res.redirect("/PaginaInicialAdmin")


  }

},




};


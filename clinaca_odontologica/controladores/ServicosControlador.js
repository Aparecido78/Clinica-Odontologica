const Servico = require("../modelos/Servicos");


module.exports = {

    async TelaCadastrarServicos(req, res) {
        res.render("Admin/Servicos/cadastrar-servicos",{
            error: req.flash("error")[0],
            success: req.flash("success")[0]
        });
    },

    async  CadastrarServico(req, res) {
        const { nome, descricao, duracao, valor } = req.body;
        const foto = req.file.filename

        if (!nome || !duracao || !descricao || !valor || !foto) {
            req.flash("error", "Todos os campos são obrigatórios");
            return res.redirect("/TelaCadastrarServicos");
        }

        try {
            const existe = await Servico.findOne({ where: { nome } });

            if (existe) {
                req.flash("error", "Serviço já existe!");
                return res.redirect("/TelaCadastrarServicos");
            }

            await Servico.create({ nome, descricao, duracao, valor, foto });

            req.flash("success", "Serviço cadastrado com sucesso!");
            return res.redirect("/PaginaInicialAdmin");

        } catch (err) {
            console.log("Erro:", err);
            req.flash("error", "Erro ao cadastrar serviço");
            return res.redirect("/TelaCadastrarServicos");
        }
    },

   async ListaServicos(req, res) {
    try {
        const servicos = await Servico.findAll();

        res.render("Admin/Servicos/lista-servicos", {
            ServicosDisponiveis: servicos.map(s => s.dataValues),
            error: req.flash("error")[0],
            success: req.flash("success")[0]
        });

    } catch (err) {
        req.flash("error", "Erro ao listar serviços");
        return res.redirect("/PaginaInicialAdmin");
    }
},


    async TelaEditarServicoAdmin(req, res) {
        const id = req.params.id;

        const servico = await Servico.findByPk(id);

        if (!servico) {
            return res.send("Serviço não encontrado");
        }

        res.render("Admin/Servicos/editar-servicos", { 
        servico: servico.get({row: true}),
        error: req.flash("error")[0],
        success: req.flash("success")[0]
    });
    },

    async AtualizarServico(req, res) {
    const id = req.params.id;
    const { nome, descricao, duracao, valor } = req.body;

    let novosDados = { nome, descricao, duracao, valor };

    if (req.file) {
        novosDados.foto = req.file.filename;
    }

    try {
        await Servico.update(novosDados, { where: { id: id } });

        req.flash("success", "Serviço atualizado com sucesso!");
        res.redirect("/PaginaInicialAdmin");

    } catch (erro) {
        console.log(erro);
        req.flash("error", "Erro ao atualizar serviço");
        res.redirect("/PaginaInicialAdmin");
    }
},
async AdminRemoverServico  (req, res) {
    try {
        const ServicoId = req.body.ServicoId; 

        
        await Servico.destroy({where:{id:ServicoId}});

        req.flash("success","servico excluido com sucesso")
        res.redirect("/PaginaInicialAdmin");
    } catch (err) {
        console.log(err)
        req.flash("error","Erro ao excluir servico")
         res.redirect("/PaginaInicialAdmin");
    }
}



};

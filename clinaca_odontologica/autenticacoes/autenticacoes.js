module.exports = {


     AutenticacaoAdmin (req,res,next){
        if(!req.session  || !req.session.admin || !req.session.admin.id){
        return res.redirect("/Login")

    }
    next()
},
AutenticacaoCliente (req,res,next){
    if(!req.session || !req.session.cliente || !req.session.cliente.id){
        return res.redirect("/Login")

    }
    next()
},
 AutenticacaoDentista (req,res,next){
    if(!req.session || !req.session.dentista || !req.session.dentista.id){
        return res.redirect("/Login")

    }
    next()
},
 AutenticacaoRecepcionista (req,res,next){
    if(!req.session  || !req.session.recepcionista || !req.session.recepcionista.id){
        return res.redirect("/Login")

    }
    next()
}
}
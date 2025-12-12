function authMiddleware(req, res, next) {
    if (req.session && req.session.usuario) {
        const role = req.session.usuario.role;
        if (role === "admin" || role === "recepcionista" || role === "cliente") {
            return next(); 
        } else {
            return res.status(403).send("Acesso negado");
        }
    } else {
        res.status(401).send("Você precisa fazer login");
    }
}

module.exports = authMiddleware

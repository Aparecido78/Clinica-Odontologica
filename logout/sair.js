
module.exports = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.redirect("/"); 
        }
        res.clearCookie("connect.sid"); 
        res.redirect("/login"); 
    });
};

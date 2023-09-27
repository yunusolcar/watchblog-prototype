module.exports = function (req, res, next) {
     res.locals.isAuth = req.session.isAuth; // projedeki tüm ejs dosyaları üzerinden ulaşılabilir artık
     res.locals.fullname = req.session.fullname;
     next();
}
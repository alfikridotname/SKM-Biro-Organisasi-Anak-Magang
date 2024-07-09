const jwt = require('jsonwebtoken')

const verifyTokenAdmin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/loginAdmin');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.admin = decoded.id_admin;
        next();
    } catch (error) {
        return res.redirect('/loginAdmin');
    }
};

module.exports = {verifyTokenAdmin}
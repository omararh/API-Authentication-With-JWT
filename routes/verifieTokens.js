const jwt = require('jsonwebtoken');


module.exports = async function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Acces denied !");

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_SECRET, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).send("Invalid token !");
    }
}
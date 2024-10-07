const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({ message: "Не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизован" })
    }

    // const authHeader = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];
    // if (token == null) return res.sendStatus(401);

    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decoded)
    // jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     req.user = user;
    //     next();
    // });
};

module.exports = { authenticateToken };


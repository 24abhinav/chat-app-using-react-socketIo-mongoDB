(function() {
    
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    const tokenSecret = process.env.JWT_SECRET;
    const tokenSecretForAdmin = process.env.JWT_ADMIN_SECRET;


    createToken = (req, tokenObject, expiry) => {
        return new Promise((res, rej) => { 
            const tokenKey = req.cookies.isAdmin ? tokenSecretForAdmin : tokenSecret;
            const token = jwt.sign(tokenObject, tokenKey, {expiresIn: expiry});
            res(token);
        });
    },
    
    authorizer = (req, res, next) => {
        const tokenKey = req.cookies.isAdmin ? tokenSecretForAdmin : tokenSecret;
        const token = req.headers.authorization;
        jwt.verify(token, tokenKey, (err, result) => {
            if (result) {
                next();
            } else {
                res.status(401).send({message: 'Token is missing'});
            }
        });
    },

    decodeToken = async (token) => {
        token = token.split(' ')[0];
        const decodedData = await verifyToken(token);
        return decodedData;
    },

    verifyToken = (token) => {
        return new Promise((res) => {
            jwt.verify(token, tokenSecret, (err, result) => {
                res(result);
            });
        });
    },


    module.exports = {
        createToken,
        authorizer,
        decodeToken,
    };

}());

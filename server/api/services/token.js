(function() {
    
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    const tokenSecret = process.env.JWT_SECRET;
    const tokenSecretForAdmin = process.env.JWT_ADMIN_SECRET;


    createToken = (tokenObject, isAdmin, response) => {
        return new Promise((res, rej) => { 
            const tokenKey = req.cookies.isAdmin ? tokenSecretForAdmin : tokenSecret;
            const token = jwt.sign(tokenObject, tokenSecretForAdmin, {expiresIn: '1h'});
            response.cookie('S', token);
            res();
        });
    },
    
    authorizer = (req, res, next) => {
        const tokenKey = req.cookies.isAdmin ? tokenSecretForAdmin : tokenSecret;

        jwt.verify(token, tokenKey, (err, result) => {
            if (result) {
                next()
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


    module.exports = {
        createToken,
        authorizer,
        decodeToken,
    };

}());

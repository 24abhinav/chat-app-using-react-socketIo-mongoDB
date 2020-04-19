(function() {
    const bcrypt = require('bcrypt');

    encryptPassword = (password) => {
        return new Promise((res, rej) => {
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) throw err;
                res(hashedPassword);
            });
        });
    },

    passwordCompare = (encryptPassword, password) => {
        return new Promise((res, rej) => {
            bcrypt.compare(password, encryptPassword, (err, result) => {
                if (err) throw err;
                res(result);
            });
        });
    },

    module.exports = {
        encryptPassword,
        passwordCompare,
    };

}());

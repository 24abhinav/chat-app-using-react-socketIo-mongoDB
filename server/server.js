(function(){
    const express =  require('express');
    const cookieParser = require('cookie-parser');
    require('dotenv/config');

    const token = require('./api/services/token');
    const userModel = require('./api/models/User');

    const app = express();
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(cookieParser());
    app.use('/chat', token.authorizer);
    app.use('/user', userModel);
    app.use('/chat/user', userModel);


    // ------------------------------------------- SERVER SETUP  -------------------------------------------
    const serverPort = process.env.PORT || 8080;
    app.listen(serverPort, () => {
        console.log(`Express server is running on port ${serverPort}`);
    });

    // ------------------------------------------- Error Handling  -------------------------------------------
    process.on('unhandledRejection', (err) => {
        console.log('Internal Server Error-->', err);
        process.exit(1);
    });

}());

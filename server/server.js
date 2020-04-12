(function(){
    const express =  require('express');
    const cookieParser = require('cookie-parser');
    var cors = require('cors')
    require('dotenv/config');

    const token = require('./api/services/token');
    const userModel = require('./api/models/User');
    const roomModel = require('./api/models/Room');
    const roomMemberAssociationModel = require('./api/models/RoomMemberAssociation');
    const messageModel = require('./api/models/messages');


    const db = require('./api/services/database');

    const app = express();

    app.use(cors({
      origin: 'http://localhost:3000'
    }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/chat', token.authorizer);
    app.use('/user', userModel);
    app.use('/chat/user', userModel);
    app.use('/chat/room', roomModel);
    app.use('/chat/member', roomMemberAssociationModel);
    app.use('/chat/message', messageModel);


    app.get('/', (req, res) => {
        res.cookie('S', 'hello');
        res.status(200).send('cookie set');
    })

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

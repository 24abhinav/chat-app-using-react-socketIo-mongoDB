const API_URL = 'http://localhost:4000';
(function() {
    // API Url
    module.exports = {
        SIGNIN: API_URL + '/user/login',
        SIGNUP: API_URL + '/user/signip',

        CHAT_ROOM: API_URL + '/chat/room'
    }

}());

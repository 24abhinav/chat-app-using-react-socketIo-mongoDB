const API_URL = 'http://localhost:4000';
(function() {
    // API Url
    module.exports = {
        SIGNIN: API_URL + '/user/login',
        SIGNUP: API_URL + '/user/signip',
        CHAT_ROOM: API_URL + '/chat/room',
        GROUP_LIST: API_URL + '/chat/member',
        FETCH_GROUP_MESSAGE: API_URL + '/chat/room/',
        FETCH_USER_DETAILS: API_URL + '/chat/user/userDetails',
        UPDATE_USER_DETAILS: API_URL + '/chat/user/update/userDetails',
        UPDATE_USER_PASSWORD: API_URL + '/chat/user/update/password',
    }

}());

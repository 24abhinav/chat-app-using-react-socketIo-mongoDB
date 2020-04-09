const axios = require('axios');
const config = require('../config');
(function () {
    function validateEmail(email) {

        return new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$').test(String(email).toLowerCase())
    }

    function getRequest(baseurl, params) {
        return new Promise((resolve, reject) => {
            const url = config[baseurl];
            axios.get(url, {
                params: params
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                resolve(error);
            })
            .finally(function () {
                // always executed
            }); 
        });
    }

    function postRequest(baseurl, payload) {
        return new Promise((resolve, reject) => {
            const url = config[baseurl];
            axios.post(url, payload)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                resolve(error);
            })
            .finally(function () {
                // always executed
            }); 
        });
    }

    module.exports = {
        validateEmail,
        getRequest,
        postRequest,
    };
}());

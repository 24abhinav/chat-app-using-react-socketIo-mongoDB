import axios from 'axios';
const config = require('../config');

const api = axios.create({
	withCredentials: false
});


const service = {
    validateEmail: (email) => {
        return new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$').test(String(email).toLowerCase())
    },

    post: (baseUrl, payload) => {
        return new Promise((resolve, reject) => {
            const url = config[baseUrl];
            api.post(url, payload).then(response => resolve(response)).catch(error => resolve(error));
        });
    },

}

export default service;
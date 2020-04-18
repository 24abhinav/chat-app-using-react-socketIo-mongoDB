import axios from 'axios';
import Cookie from 'js-cookie';
const config = require('../config');

const api = axios.create({
	withCredentials: false
});

const token = Cookie.get('S');

const service = {
    validateEmail: (email) => {
        return new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$').test(String(email).toLowerCase())
    },

    get: (baseUrl, params) => {
        return new Promise((resolve, reject) => {
            let url = config[baseUrl];
            if(params) {
                url += params;
            }

            api.get(url, { headers: {"Authorization" : token}}).then(response => resolve({Error: null, response})).catch(error => {
                if(error.response.status === 401) {
                    Cookie.remove('S');
                    window.location.reload();
                }
                resolve({Error:true,  error});
            });
        });
    },

    post: (baseUrl, payload) => {
        return new Promise((resolve, reject) => {
            const url = config[baseUrl];
            api.post(url, payload, { headers: {"Authorization" : token}}).then(response => resolve({Error: null, response})).catch(error => {
                if(error.response.status === 401) {
                    // Cookie.remove('S');
                    // window.location.href = '';
                    debugger
                }
                resolve({Error:true,  error});
            });
        });
    },

}

export default service;
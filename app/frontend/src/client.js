import config from "./config";
import axios from "axios"

import jwtDecode from "jwt-decode";
import * as moment from "moment";

// import jest from 'jest';

// jest.unmock('axios');
// const axios = require('axios');

class FastAPIClient {
    constructor(overrides) {
        this.config = {
            ...config,
            ...overrides
        };
        this.apiClient = this.getApiClient(this.config);
    }

    getApiClient(config) {
        const initialConfig = {
            baseURL: `${config.apiBasePath}`
        };

        const client = axios.create(initialConfig);
        client.interceptors.request.use(localStorageTokenInterceptor);

        return client;
    }

    login(data) {
        localStorage.setItem('telegram', JSON.stringify(data));

        return this.apiClient
            .post('auth/telegram', data)
            .then((resp) => {
                localStorage.setItem('token', JSON.stringify(resp.data));
                return this.fetchUser();
            });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
    }

    register(name, level) {
        const token = JSON.parse(localStorage.getItem('telegram'))
        const data = {
            name: name,
            level: level,
            telegram_id: 0
        }

        return this.apiClient.post('auth/register', {token, data}).then(
            (resp) => { return resp.data }
        );
    }

    fetchUser() {
        return this.apiClient.get('user/me').then(({data}) => {
            localStorage.setItem('user', JSON.stringify(data));
            return data
        });
    }

    fetchUsers(offset, limit) {
        return this.apiClient.get(`user/?offset=${offset}&limit=${limit}`).then(
            ({data}) => { return data; }
        )
    }

    getUserWorkshifts(date) {
        return this.apiClient.get(`/workshift/?timestamp=${date}&days=7&limit=20`).then(
            ({data}) => { return data; }
        );
    }

    getUserOffers() {
        return this.apiClient.get('/offer/?offset=0&limit=10').then(
            ({data}) => { return data; }
        );
    }

    getAvailableOffers(){}

    publishOffer(){}
    deleteOffer(){}
    acceptOffer(){}
}

function localStorageTokenInterceptor(config) {
    const headers = {};
    const tokenString = localStorage.getItem('token');
  
    if (tokenString) {
        const token = JSON.parse(tokenString);
        const decodedAccessToken = jwtDecode(token.access_token);
        const isAccessTokenValid =
            moment.unix(decodedAccessToken.exp).toDate() > new Date();
        
        if (isAccessTokenValid) {
            headers['Authorization'] = `Bearer ${token.access_token}`;
        } else {
            alert('Your login session has expired');
        }
    }

    config['headers'] = headers;
    return config;
}

export default FastAPIClient;

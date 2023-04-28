import config from "./config";
import axios from "axios"

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

    login() {

    }

    logout() {
        localStorage.removeItem('token');
    }

    getUserWorkshifts(date) {
        return this.apiClient.get(`/workshift/?timestamp=${date}&days=7&limit=20`).then(
            ({data}) => { return data; }
        );
    }

    getUserOffers(){}

    getAvailableOffers(){}

    publishOffer(){}
    deleteOffer(){}
    acceptOffer(){}
}

function localStorageTokenInterceptor(config) {
    // const headers = {};
    // const tokenString = localStorage.getItem('token');
  
    // if (tokenString) {
    //     const token = JSON.parse(tokenString);
    //     const decodedAccessToken = jwtDecode(token.access_token);
    //     const isAccessTokenValid =
    //         moment.unix(decodedAccessToken.exp).toDate() > new Date();
        
    //     if (isAccessTokenValid) {
    //         headers['Authorization'] = `Bearer ${token.access_token}`;
    //     } else {
    //         alert('Your login session has expired');
    //     }
    // }

    // config['headers'] = headers;
    return config;
}

export default FastAPIClient;

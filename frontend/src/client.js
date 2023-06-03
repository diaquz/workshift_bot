import config from "./config";
import axios from "axios"

import jwtDecode from "jwt-decode";
import * as moment from "moment";

class FastAPIClient {
    constructor(overrides) {
        this.config = {
            ...config,
            ...overrides
        };
        this.apiClient = this.getApiClient(this.config);
    }

    checkAuth() {
        const tokenString = localStorage.getItem('token');
        if(tokenString) {
            const token = JSON.parse(tokenString);
            const decodedAccessToken = jwtDecode(token.access_token);
            if(moment.unix(decodedAccessToken.exp).toDate() > new Date()) return true;
        }

        return false;
    }

    checkPermissions() {
        const userString = localStorage.getItem('user');
        if(userString) {
            const user = JSON.parse(userString);
            if(user.privilage > 0) return true;
        }
        return false;
    }

    currentUser() {
        const userString = localStorage.getItem('user');
        if(userString) {
            const user = JSON.parse(userString);
            return user;
        }
        
        return null;
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

    createEvent(user, event, time) {
        alert(JSON.stringify(time));

        const data = {
            user_id: user.id,
            start_time: time.start.format(),
            end_time: time.end.format(),
            type: time.type,
            notify: false
        }

        if(event == null)
            return this.apiClient.post('/event/create', data).then(
                ({data}) => { return data; }
            );
        else
            data.id = event.id

            return this.apiClient.post('event/edit', data).then(
                ({data}) => { return data; }
            );
    }

    fetchEvent(date) {
        return this.apiClient.get(`/event/events?timestamp=${date}`).then(
            ({data}) => { return data; }
        );
    }

    fetchUserEvents(date, days=7, workshift=false) {
        return this.apiClient.get(`/event/?timestamp=${date}&days=${days}&workshift=${workshift}`).then(
            ({data}) => { return data; }
        );
    }

    deleteEvent(id) {
        return this.apiClient.post(`/event/delete?id=${id}`).then(
            ({data}) => { return data; }
        )
    }

    fetchAviableOffers(offset) {
        return this.apiClient.get(`/offer/?offset=${offset}&limit=10`).then(
            ({data}) => { return data; }
        );
    }

    fetchUserOffers() {
        return this.apiClient.get('/offer/mine').then(
            ({data}) => { return data; }
        );
    }

    publishOffer(id) {
        alert(id)
        return this.apiClient.post(`offer/create?id=${id}`).then(
            (resp) => { return resp.data }
        );
    }

    deleteOffer(id) {
        return this.apiClient.post(`offer/delete?id=${id}`).then(
            ({data}) => { return data }
        );
    }

    fetchUserAnswers() {
        return this.apiClient.get('offer/answer/me').then(
            ({data}) => { return data; }
        );
    }

    createAnswer(offer_id, event_id) {
        return this.apiClient.post(`offer/answer/create?offer_id=${offer_id}&event_id=${event_id}`).then(
            ({data}) => { return data }
        );
    }

    fetchRequests(offset, limit) {
        return this.apiClient.get(`/auth/requests?offset=${offset}&limit=${limit}`).then(
            ({data}) => { return data; }
        );
    }

    acceptRequest(id) {
        return this.apiClient.post(`/auth/requests/accept?request_id=${id}`).then(
            ({data}) => { return data; }
        );
    }

    dismissRequest(id) {
        return this.apiClient.post(`/auth/requests/dismiss?request_id=${id}`).then(
            ({data}) => { return data; }
        );
    }

    acceptAnswer(id) {
        return this.apiClient.post(`/offer/answer/accept?id=${id}`).then(
            ({data}) => { return data; }
        );
    }

    deleteAnswer(id) {
        return this.apiClient.post(`/offer/answer/delete?id=${id}`).then(
            ({data}) => { return data; }
        );
    }

    fetchFeedback() {
        return this.apiClient.get('/feedback/').then(
            ({data}) => { return data; }
        );
    }

    createFeedback(data) {

    }

    deleteFeedback(id) {
        return this.apiClient.post(`/feedback/delete?id=${id}`).then(
            ({data}) => { return data; }
        );
    }
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

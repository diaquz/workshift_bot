import axios from "axios"
import moment from "moment";
import jwtDecode from "jwt-decode";

const setupInterceptors = () => {
    axios.interceptors.request.use(req =>{
        const headers = {};
        const tokenString = localStorage.getItem('token');
      
        if (tokenString) {
            const token = JSON.parse(tokenString);
            const decodedAccessToken = jwtDecode(token.access_token);
            const isAccessTokenValid = moment.unix(decodedAccessToken.exp).toDate() > new Date();
            
            if (isAccessTokenValid) {
                headers['Authorization'] = `Bearer ${token.access_token}`;
            }
        }
    
        req['headers'] = headers;
        return req;
    })
}

const checkAuth = () => {
    const tokenString = localStorage.getItem('token');
    if(tokenString) {
        const token = JSON.parse(tokenString);
        const decodedAccessToken = jwtDecode(token.access_token);
        if(moment.unix(decodedAccessToken.exp).toDate() > new Date()) return true;
    }

    return false;
};

const checkPermissions = () => {
    const user = currentUser();

    return (user && user.privilage);
};

const currentUser = () => {
    const userString = localStorage.getItem('user');
    if(userString) {
        const user = JSON.parse(userString);
        return user;
    }
    
    return null;
};

const hasTelegramToken = () => {
    const token = localStorage.getItem('telegram')
    if(token) return true;
    else return false;
}

const getTelegramToken = () => {
    const token = JSON.parse(localStorage.getItem('telegram'))

    return token;
}

export { setupInterceptors, checkAuth, currentUser, hasTelegramToken, getTelegramToken, checkPermissions };
